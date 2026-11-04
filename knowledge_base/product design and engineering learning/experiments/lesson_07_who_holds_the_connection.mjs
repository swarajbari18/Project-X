// Lesson 7: is it a real WebSocket, and who holds the connection while the object sleeps?
//
// This uses no WebSocket library and no browser. It opens a plain TCP connection, writes the
// upgrade request by hand, and builds each WebSocket frame by hand, so nothing is hidden.
//
// First run `npm install` inside lesson_07_live_page. Then, from this folder:
//
//     node lesson_07_who_holds_the_connection.mjs
//
// It runs on Linux, because it uses `ss` to ask the operating system who holds each connection.
// It starts its own local server, and sends nothing to Cloudflare. It takes about 70 seconds.
import { execSync, spawn } from "node:child_process";
import { createHash, randomBytes } from "node:crypto";
import { mkdtempSync, rmSync } from "node:fs";
import net from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const PROJECT = fileURLToPath(new URL("./lesson_07_live_page/", import.meta.url));
const DATA = mkdtempSync(join(tmpdir(), "lesson07-holds-"));
const PORT = 8850;
const sleep = (ms) => new Promise((done) => setTimeout(done, ms));
let started = 0;
const seconds = () => `[${String(Math.round((performance.now() - started) / 1000)).padStart(3)} s]`;
const say = (text) => console.log(`${seconds()} ${text}`);

// ---------- The local server, and a record of each time the constructor ran ----------

const constructorRuns = {};
const server = spawn("npx", ["wrangler", "dev", "--port", String(PORT), "--persist-to", DATA], {
  cwd: PROJECT, detached: true, stdio: ["ignore", "pipe", "ignore"],
  env: { ...process.env, WRANGLER_SEND_METRICS: "false", NO_COLOR: "1" },
});
await new Promise((ready, failed) => {
  server.stdout.on("data", (text) => {
    for (const match of String(text).matchAll(/ran: the constructor, for the object named (\S+)/g)) {
      constructorRuns[match[1]] = (constructorRuns[match[1]] ?? 0) + 1;
    }
    if (String(text).includes("Ready on")) ready();
  });
  server.on("exit", () => failed(new Error(`The local server did not start. Is something using port ${PORT}?`)));
});
server.removeAllListeners("exit");
function stopEverything() {
  try { process.kill(-server.pid, "SIGKILL"); } catch { /* Already stopped. */ }
}
process.on("uncaughtException", (error) => {
  console.error(`It could not finish: ${error.message}`);
  stopEverything();
  process.exit(1);
});
await sleep(500);
started = performance.now();

// ---------- A WebSocket, by hand ----------

function openByHand(path) {
  return new Promise((open) => {
    const key = randomBytes(16).toString("base64");
    const connection = net.connect({ host: "localhost", port: PORT });
    const raw = { connection, key, frames: [], closed: false, buffered: Buffer.alloc(0), handshake: null };
    connection.on("connect", () => {
      raw.request = `GET ${path} HTTP/1.1\r\nHost: localhost:${PORT}\r\nUpgrade: websocket\r\nConnection: Upgrade\r\n`
        + `Sec-WebSocket-Key: ${key}\r\nSec-WebSocket-Version: 13\r\n\r\n`;
      connection.write(raw.request);
    });
    connection.on("close", () => { raw.closed = true; raw.closedAt = performance.now(); });
    connection.on("error", () => {});
    connection.on("data", (chunk) => {
      raw.buffered = Buffer.concat([raw.buffered, chunk]);
      if (!raw.handshake) {
        const end = raw.buffered.indexOf("\r\n\r\n");
        if (end < 0) return;
        raw.handshake = raw.buffered.subarray(0, end).toString();
        raw.buffered = raw.buffered.subarray(end + 4);
        open(raw);
      }
      // Frames from a server: first byte holds the kind, second byte the length, then the payload.
      while (raw.buffered.length >= 2 && raw.buffered.length >= 2 + (raw.buffered[1] & 127)) {
        const length = raw.buffered[1] & 127;
        raw.frames.push({ kind: raw.buffered[0] & 15, text: raw.buffered.subarray(2, 2 + length).toString() });
        raw.buffered = raw.buffered.subarray(2 + length);
      }
    });
  });
}

// A frame from a client must be masked, says the standard: each byte is mixed with a random key.
function sendFrame(raw, kind, text) {
  const payload = Buffer.from(text);
  const mask = randomBytes(4);
  const masked = payload.map((byte, index) => byte ^ mask[index % 4]);
  raw.connection.write(Buffer.concat([Buffer.from([0x80 | kind, 0x80 | payload.length]), mask, masked]));
}
const KIND_TEXT = 1;
const KIND_PING = 9;
const KIND_PONG = 10;

async function nextFrame(raw, from) {
  for (let waited = 0; waited < 5000; waited += 10) {
    if (raw.frames.length > from) return raw.frames[from];
    await sleep(10);
  }
  return null;
}

// Ask the operating system which process holds the far end of this connection.
function whoHoldsTheOtherEnd(raw) {
  const line = execSync("ss -tnpH state established").toString().split("\n")
    .find((row) => row.split(/\s+/)[3]?.endsWith(`:${raw.connection.localPort}`));
  const holder = line?.match(/users:\(\("([^"]+)",pid=(\d+),fd=(\d+)/);
  return holder ? `${holder[1]}, process ${holder[2]}, file descriptor ${holder[3]}` : "no process: the connection is gone";
}

const runs = (name) => constructorRuns[name] ?? 0;
const wokeUpAt = async (name) => (await (await fetch(`http://localhost:${PORT}/situations/${name}/when-did-you-wake-up`)).json()).wokeUpAt;

// ---------- The timeline ----------

console.log("\n=== 1. IS IT A REAL WEBSOCKET? ===");
const sleeper = await openByHand("/situations/sleeper/live");
console.log("I sent this, by hand, over a plain TCP connection:");
console.log(sleeper.request.trim().split("\r\n").map((line) => `   ${line}`).join("\n"));
console.log("The server answered:");
console.log(sleeper.handshake.split("\r\n").map((line) => `   ${line}`).join("\n"));
const expected = createHash("sha1").update(`${sleeper.key}258EAFA5-E914-47DA-95CA-C5AB0DC85B11`).digest("base64");
console.log(`The standard (RFC 6455) says the accept value must be: ${expected}`);
console.log(`Does it match: ${sleeper.handshake.includes(expected)}`);

const keptAwake = await openByHand("/situations/kept-awake/live-plain-accept");
const keptAwakeFirstWake = await wokeUpAt("kept-awake");

console.log("\n=== 2. WHO HOLDS THE CONNECTION? ===");
await sleep(400);
const holderAtStart = whoHoldsTheOtherEnd(sleeper);
say(`my end is port ${sleeper.connection.localPort}. The other end is held by: ${holderAtStart}`);
say(`the constructor has run ${runs("sleeper")} time for the object named sleeper`);

console.log("\n=== 3. NOTHING HAPPENS, SO THE OBJECT SLEEPS. WHAT STILL WORKS? ===");
await sleep(25000);
let seen = sleeper.frames.length;
sendFrame(sleeper, KIND_PING, "are you alive");
const pong = await nextFrame(sleeper, seen);
say(`I sent a protocol ping. I got back: ${pong?.kind === KIND_PONG ? `a pong, carrying "${pong.text}"` : "nothing"}`);
await sleep(300);
say(`the constructor has run ${runs("sleeper")} time. So the object was not built to answer that.`);

seen = sleeper.frames.length;
sendFrame(sleeper, KIND_TEXT, "ping");
const pongText = await nextFrame(sleeper, seen);
say(`I sent the text "ping". I got back: "${pongText?.text}"`);
await sleep(300);
say(`the constructor has run ${runs("sleeper")} time. The runtime answered this one too.`);
say(`still the same connection? ${whoHoldsTheOtherEnd(sleeper) === holderAtStart ? "yes" : "NO"}: ${whoHoldsTheOtherEnd(sleeper)}`);

console.log("\n=== 4. A REAL MESSAGE ARRIVES ===");
await sleep(12000);
seen = sleeper.frames.length;
sendFrame(sleeper, KIND_TEXT, "are you there");
const reply = await nextFrame(sleeper, seen);
say(`I sent the text "are you there". The object's code answered: ${reply?.text}`);
await sleep(300);
say(`the constructor has now run ${runs("sleeper")} times. The runtime built the object again, to deliver this.`);

console.log("\n=== 5. THE SAME CONNECTION, BUT THE OBJECT'S OWN CODE HOLDS IT (plain accept) ===");
const keptAwakeLaterWake = await wokeUpAt("kept-awake");
say(`its wake-up time changed? ${keptAwakeLaterWake !== keptAwakeFirstWake ? "yes, it slept" : "no. It never slept"}. Its constructor has run ${runs("kept-awake")} time.`);

console.log("\n=== 6. A SAVE ARRIVES FROM SOMEWHERE ELSE, AFTER THE OBJECT SLEPT AGAIN ===");
await sleep(15000);
seen = sleeper.frames.length;
await fetch(`http://localhost:${PORT}/situations/sleeper`, {
  method: "POST",
  body: JSON.stringify({ builtOnVersion: 0, writtenBy: "situation worker", whatChanged: "a step" }),
});
const nudge = await nextFrame(sleeper, seen);
await sleep(300);
say(`the nudge reached my old connection: ${nudge?.text}`);
say(`the constructor has now run ${runs("sleeper")} times. Still my same connection, on port ${sleeper.connection.localPort}.`);

console.log("\n=== 7. NOW THE PROCESS HOLDING THE CONNECTION DIES ===");
const killedAt = performance.now();
const runtimes = execSync(`pgrep -g ${server.pid} -x workerd`).toString().trim().split("\n");
for (const pid of runtimes) process.kill(Number(pid), "SIGKILL");
for (let waited = 0; waited < 3000 && !sleeper.closed; waited += 10) await sleep(10);
say(sleeper.closed
  ? `my connection closed, ${(sleeper.closedAt - killedAt).toFixed(0)} ms after I killed the runtime. Nothing keeps it alive once the holder is gone.`
  : "my connection is still open");

stopEverything();
await sleep(500);
rmSync(DATA, { recursive: true, force: true });
process.exit(0);
