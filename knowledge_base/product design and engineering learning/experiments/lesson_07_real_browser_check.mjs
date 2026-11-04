// Lesson 7: the same page in two real Chrome tabs, with its real buttons clicked by this script.
//
// READ THIS FIRST. Swaraj's rule, 4 November 2026: no Playwright, and browser automation only in a sandbox.
// This script does not use Playwright. It drives Chrome directly, through Chrome's own debug port.
// It is NOT sandboxed: it runs your installed Chrome on this machine, with a throwaway profile, and while
// it runs, any program on this machine can reach that debug port. Do not run it outside a sandbox.
//
// You can do all of this by hand: run `npm run dev` in lesson_07_live_page, and open localhost:8787 in two windows.
//
// First run `npm install` inside lesson_07_live_page. Then, from this folder:
//
//     node lesson_07_real_browser_check.mjs  [a file to save a picture of the page to]
//
// It needs google-chrome installed. It uses a throwaway Chrome profile, and sends nothing to Cloudflare.
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const PROJECT = fileURLToPath(new URL("./lesson_07_live_page/", import.meta.url));
const FOLDER = mkdtempSync(join(tmpdir(), "lesson07-browser-"));
const PORT = 8840;
const CHROME_PORT = 9333;
const PAGE = `http://localhost:${PORT}/?situation=browser-check`;
const sleep = (ms) => new Promise((done) => setTimeout(done, ms));

const server = spawn("npx", ["wrangler", "dev", "--port", String(PORT), "--persist-to", join(FOLDER, "data")], {
  cwd: PROJECT, detached: true, stdio: ["ignore", "pipe", "ignore"],
  env: { ...process.env, WRANGLER_SEND_METRICS: "false" },
});
await new Promise((ready, failed) => {
  server.stdout.on("data", (text) => { if (String(text).includes("Ready on")) ready(); });
  server.on("exit", () => failed(new Error(`The local server did not start. Is something already using port ${PORT}?`)));
});
server.removeAllListeners("exit");

const chrome = spawn("google-chrome", ["--headless=new", `--remote-debugging-port=${CHROME_PORT}`,
  `--user-data-dir=${join(FOLDER, "chrome")}`, "--no-first-run", "--window-size=900,520", "about:blank"],
  { detached: true, stdio: "ignore" });

function stopEverything(how = "SIGTERM") {
  for (const running of [chrome, server]) {
    try { process.kill(-running.pid, how); } catch { /* Already stopped. */ }
  }
}
process.on("uncaughtException", (error) => {
  console.error(`The check could not finish: ${error.message}`);
  stopEverything();
  process.exit(1);
});

let chromeAnswered = false;
for (let tries = 0; tries < 50 && !chromeAnswered; tries++) {
  try { await fetch(`http://localhost:${CHROME_PORT}/json/version`); chromeAnswered = true; } catch { await sleep(200); }
}
if (!chromeAnswered) throw new Error("Chrome did not start. A very long TMPDIR can cause this.");

async function openTab(address) {
  const answer = await fetch(`http://localhost:${CHROME_PORT}/json/new?${encodeURIComponent(address)}`, { method: "PUT" });
  const { webSocketDebuggerUrl } = await answer.json();
  const socket = new WebSocket(webSocketDebuggerUrl);
  await new Promise((open) => { socket.onopen = open; });
  let nextId = 1;
  const waiting = new Map();
  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (waiting.has(message.id)) waiting.get(message.id)(message.result);
  };
  const send = (method, params = {}) => new Promise((done) => {
    const id = nextId++;
    waiting.set(id, done);
    socket.send(JSON.stringify({ id, method, params }));
  });
  const run = async (expression) => (await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true })).result.value;
  return {
    send,
    click: (button) => run(`document.getElementById("${button}").click()`),
    connection: () => run(`document.getElementById("connection").textContent`),
    versions: () => run(`document.querySelectorAll("#versions li").length`),
    run,
  };
}

async function waitFor(check, limit = 15000) {
  const started = performance.now();
  while (performance.now() - started < limit) {
    if (await check()) return performance.now() - started;
    await sleep(20);
  }
  return null;
}

const report = async (when, first, second) => console.log(`${when.padEnd(44)} tab A: ${await first.connection()}, ${await first.versions()} versions   tab B: ${await second.connection()}, ${await second.versions()} versions`);

const tabA = await openTab(PAGE);
const tabB = await openTab(PAGE);
await waitFor(async () => (await tabA.connection()) === "live" && (await tabB.connection()) === "live");
await report("Both tabs open", tabA, tabB);

await tabA.click("save");
const tookMs = await waitFor(async () => (await tabB.versions()) === 1);
await waitFor(async () => (await tabA.versions()) === 1); // A hears the same nudge, and its own read takes a moment.
await report("Clicked Save in A. B was not reloaded", tabA, tabB);
console.log(`   B showed it ${tookMs === null ? "NEVER" : `within ${tookMs.toFixed(0)} ms`}`);

await tabA.click("cut");
await waitFor(async () => (await tabA.connection()) !== "live");
for (let saves = 2; saves <= 4; saves++) {
  await tabB.click("save");
  await waitFor(async () => (await tabB.versions()) === saves);
}
await report("Cut A, then clicked Save in B three times", tabA, tabB);

await waitFor(async () => (await tabA.versions()) === 4);
await report("A came back by itself after 8 seconds", tabA, tabB);

// A customer's words must not run as code on the page.
await fetch(`http://localhost:${PORT}/situations/browser-check`, {
  method: "POST",
  body: JSON.stringify({ builtOnVersion: 4, writtenBy: "situation worker", whatChanged: '<img src=x onerror="document.title=1">' }),
});
await waitFor(async () => (await tabA.versions()) === 5);
console.log(`A customer's message containing HTML:        pictures created on the page: ${await tabA.run(`document.querySelectorAll("#versions img").length`)}`);

if (process.argv[2]) {
  const { data } = await tabA.send("Page.captureScreenshot", { format: "png" });
  writeFileSync(process.argv[2], Buffer.from(data, "base64"));
}

stopEverything();
await sleep(2000);
stopEverything("SIGKILL"); // The runtime can ignore a polite stop. It must not outlive this script.
await sleep(300);
rmSync(FOLDER, { recursive: true, force: true });
process.exit(0);
