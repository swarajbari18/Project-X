// Lesson 7: measure three ways of keeping a page up to date, and what happens when a connection breaks.
//
// First run `npm install` inside lesson_07_live_page. Then, from this folder:
//
//     node lesson_07_measure_live_updates.mjs
//
// It starts its own local server, and keeps its data in a throwaway folder. It sends nothing to Cloudflare.
// The "pages" here are small scripts that behave as the real page does. It takes about two minutes.
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const PROJECT = fileURLToPath(new URL("./lesson_07_live_page/", import.meta.url));
const DATA = mkdtempSync(join(tmpdir(), "lesson07-"));
const PORT = 8830;
const ORIGIN = `http://localhost:${PORT}`;
const sleep = (ms) => new Promise((done) => setTimeout(done, ms));
const median = (list) => [...list].sort((a, b) => a - b)[Math.floor(list.length / 2)];
const heading = (title) => console.log(`\n${"=".repeat(78)}\n${title}\n${"=".repeat(78)}`);

function startServer() {
  return new Promise((ready, failed) => {
    const server = spawn("npx", ["wrangler", "dev", "--port", String(PORT), "--persist-to", DATA], {
      cwd: PROJECT, detached: true, stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env, WRANGLER_SEND_METRICS: "false" },
    });
    server.stdout.on("data", (text) => { if (String(text).includes("Ready on")) ready(server); });
    server.stderr.on("data", () => {});
    server.on("exit", () => failed(new Error("the server stopped before it was ready")));
  });
}

async function stopServer(server) {
  await new Promise((stopped) => {
    server.removeAllListeners("exit");
    server.on("exit", () => stopped());
    process.kill(-server.pid, "SIGTERM");
  });
  await sleep(1000);
  // The runtime can ignore a polite stop. It must not outlive this script.
  try { process.kill(-server.pid, "SIGKILL"); } catch { /* Already stopped. */ }
  await sleep(300);
}

async function save(situation, builtOnVersion, whatChanged = "a step") {
  const answer = await fetch(`${ORIGIN}/situations/${situation}`, {
    method: "POST",
    body: JSON.stringify({ builtOnVersion, writtenBy: "situation worker", whatChanged }),
  });
  return answer.json();
}

const wokeUpAt = async (situation) =>
  (await (await fetch(`${ORIGIN}/situations/${situation}/when-did-you-wake-up`)).json()).wokeUpAt;

function openSocket(situation, onNudge) {
  return new Promise((open, failed) => {
    const socket = new WebSocket(`ws://localhost:${PORT}/situations/${situation}/live`);
    socket.onopen = () => open(socket);
    socket.onerror = () => failed(new Error("could not connect"));
    socket.onmessage = (event) => onNudge(JSON.parse(event.data).newestVersion);
  });
}

async function openOneWayStream(situation, onNudge) {
  const stop = new AbortController();
  const answer = await fetch(`${ORIGIN}/situations/${situation}/one-way-stream`, { signal: stop.signal });
  const reader = answer.body.getReader();
  (async () => {
    const decoder = new TextDecoder();
    try {
      for (;;) {
        const { value, done } = await reader.read();
        if (done) return;
        for (const match of decoder.decode(value).matchAll(/data: (.*)/g)) onNudge(JSON.parse(match[1]).newestVersion);
      }
    } catch { /* The stream was stopped on purpose. */ }
  })();
  return stop;
}

// ---------- 1. How fast does a page find out, and what does it cost? ----------

async function howFast(name, startWatching) {
  const situation = `how-fast-${name.replaceAll(" ", "-")}`;
  const startedAt = {};
  const delays = [];
  let seenUpTo = 0;
  const onNewest = (newest) => {
    for (let version = seenUpTo + 1; version <= newest; version++) {
      if (startedAt[version]) delays.push(performance.now() - startedAt[version]);
    }
    seenUpTo = Math.max(seenUpTo, newest);
  };
  const watcher = await startWatching(situation, onNewest);
  const began = performance.now();
  for (let version = 1; version <= 20; version++) {
    await sleep(300 + Math.random() * 1200);
    startedAt[version] = performance.now();
    await save(situation, version - 1);
  }
  await sleep(1300);
  const seconds = (performance.now() - began) / 1000;
  await watcher.stop();
  console.log(`${name.padEnd(24)} typical ${median(delays).toFixed(0).padStart(5)} ms   worst ${Math.max(...delays).toFixed(0).padStart(5)} ms   `
    + `requests made just to watch: ${String(watcher.requests()).padStart(3)} in ${seconds.toFixed(0)} s`);
}

const askAgainAndAgain = async (situation, onNewest) => {
  let requests = 0;
  const timer = setInterval(async () => {
    requests++;
    onNewest((await (await fetch(`${ORIGIN}/situations/${situation}`)).json()).newestVersion);
  }, 1000);
  return { requests: () => requests, stop: () => clearInterval(timer) };
};
const oneWayStream = async (situation, onNewest) => {
  const stream = await openOneWayStream(situation, onNewest);
  return { requests: () => 1, stop: () => stream.abort() };
};
const twoWaySocket = async (situation, onNewest) => {
  const socket = await openSocket(situation, onNewest);
  return { requests: () => 1, stop: () => socket.close() };
};

// ---------- 2. Does the object get to sleep? ----------

async function doesItSleep(name, connect) {
  const situation = `sleep-${name.replaceAll(" ", "-")}`;
  await save(situation, 0);
  let nudged = 0;
  const connection = await connect(situation, () => { nudged++; });
  const before = await wokeUpAt(situation);
  await sleep(40000);
  const after = await wokeUpAt(situation);
  const stillOpen = connection?.readyState === undefined ? "-" : connection.readyState === WebSocket.OPEN ? "yes" : "NO";
  await save(situation, 1);
  await sleep(300);
  console.log(`${name.padEnd(24)} slept: ${after !== before ? "YES" : "no "}   connection still open: ${stillOpen.padEnd(3)}   `
    + `next save still reached the page: ${connect === noConnection ? "-" : nudged === 1 ? "yes" : "NO"}`);
  if (connection?.close) connection.close();
  if (connection?.abort) connection.abort();
}

const noConnection = async () => undefined;

// ---------- A page, written the way the real page is ----------

class Page {
  constructor(situation, { catchesUp }) {
    Object.assign(this, { situation, catchesUp, shown: 0, wait: 200, stayAway: false, reconnects: 0, closedWith: null });
  }
  async catchUp() {
    const answer = await fetch(`${ORIGIN}/situations/${this.situation}/versions-since/${this.shown}`);
    for (const version of await answer.json()) this.shown = Math.max(this.shown, version.version_number);
  }
  connect() {
    this.socket = new WebSocket(`ws://localhost:${PORT}/situations/${this.situation}/live`);
    this.socket.onopen = () => { this.reconnects++; this.wait = 200; this.backAt = performance.now(); if (this.catchesUp) this.catchUp(); };
    this.socket.onmessage = (event) => {
      if (this.catchesUp) this.catchUp();
      else this.shown = JSON.parse(event.data).newestVersion;
    };
    this.socket.onerror = () => {};
    this.socket.onclose = (event) => {
      this.closedWith = event.code;
      if (this.stayAway) return;
      setTimeout(() => this.connect(), this.wait);
      this.wait = Math.min(this.wait * 2, 3000);
    };
  }
  cut() { this.stayAway = true; this.socket.close(); }
  comeBack() { this.stayAway = false; this.connect(); }
}

// ---------- The measurements ----------

let server = await startServer();

heading("1. HOW FAST DOES A PAGE FIND OUT? (20 saves, on this laptop, with no real network)");
await howFast("ask every second", askAgainAndAgain);
await howFast("one-way stream", oneWayStream);
await howFast("two-way socket", twoWaySocket);

heading("2. WHILE NOTHING HAPPENS FOR 40 SECONDS, DOES THE OBJECT SLEEP?");
await Promise.all([
  doesItSleep("nobody watching", noConnection),
  doesItSleep("one-way stream", openOneWayStream),
  doesItSleep("two-way socket", openSocket),
]);

heading("3. A PAGE LOSES ITS CONNECTION, AND THREE SAVES HAPPEN WHILE IT IS AWAY");
{
  const situation = "away";
  const trusting = new Page(situation, { catchesUp: false });
  const catchingUp = new Page(situation, { catchesUp: true });
  trusting.connect();
  catchingUp.connect();
  await sleep(500);
  await save(situation, 0);
  await save(situation, 1);
  await sleep(300);
  console.log(`before the cut:                      only-trusts-nudges shows ${trusting.shown}   catches-up shows ${catchingUp.shown}`);
  trusting.cut();
  catchingUp.cut();
  await sleep(300);
  for (const builtOn of [2, 3, 4]) await save(situation, builtOn);
  trusting.comeBack();
  catchingUp.comeBack();
  await sleep(600);
  console.log(`three saves later, connected again:  only-trusts-nudges shows ${trusting.shown}   catches-up shows ${catchingUp.shown}   the truth is 5`);
  trusting.cut();
  catchingUp.cut();
}

heading("4. THE SERVER STOPS WHILE A PAGE IS WATCHING, THE WAY A RESTART DOES");
{
  const situation = "restart";
  const page = new Page(situation, { catchesUp: true });
  page.connect();
  await sleep(500);
  await save(situation, 0);
  await save(situation, 1);
  await sleep(300);
  console.log(`before the restart:   page shows ${page.shown}`);
  await stopServer(server);
  await sleep(500);
  console.log(`server stopped:       connection closed with code ${page.closedWith}. The page keeps trying.`);
  const restartedAt = performance.now();
  server = await startServer();
  while (page.reconnects < 2 && performance.now() - restartedAt < 30000) await sleep(100);
  await sleep(300);
  console.log(`server back:          page connected again by itself, ${((page.backAt - restartedAt) / 1000).toFixed(1)} s after the restart began, and shows ${page.shown}`);
  await save(situation, 2);
  await sleep(300);
  console.log(`one more save:        page shows ${page.shown}`);
  page.cut();
}

heading("5. MANY PAGES WATCH ONE OBJECT (on this laptop only)");
for (const count of [1, 100, 1000]) {
  const situation = `crowd-${count}`;
  let told = 0;
  let lastToldAt = 0;
  const sockets = await Promise.all(Array.from({ length: count }, () => openSocket(situation, () => {
    told++;
    lastToldAt = performance.now();
  })));
  await sleep(500);
  const startedAt = performance.now();
  await save(situation, 0);
  const savedAfter = performance.now() - startedAt;
  while (told < count && performance.now() - startedAt < 10000) await sleep(5);
  console.log(`${String(count).padStart(5)} pages:   the save answered in ${savedAfter.toFixed(0).padStart(4)} ms   the last page knew after ${(lastToldAt - startedAt).toFixed(0).padStart(4)} ms   pages told: ${told}`);
  sockets.forEach((socket) => socket.close());
  await sleep(300);
}

await stopServer(server);
await sleep(2000); // Give the runtime time to shut down, before its data folder is removed.
rmSync(DATA, { recursive: true, force: true });
process.exit(0);
