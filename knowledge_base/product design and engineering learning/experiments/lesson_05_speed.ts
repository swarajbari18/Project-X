// Lesson 5: JavaScript's side of the speed comparison. Needs: npm install zod.
import { z } from "zod";
import { Worker, isMainThread, parentPort, workerData } from "node:worker_threads";
import { fileURLToPath } from "node:url";

function count(n: number) { let total = 0; for (let i = 0; i < n; i++) total += i * 2 % 7; return total; }

if (!isMainThread) { count(workerData); parentPort!.postMessage("done"); } else {
  const measure = async (name: string, work: () => unknown) => {
    const start = performance.now(); await work(); console.log(`${name}: ${Math.round(performance.now() - start).toLocaleString()} ms`);
  };
  function fib(n: number): number { return n < 2 ? n : fib(n - 1) + fib(n - 2); }
  await measure("recursive fib(35)", () => fib(35));
  await measure("loop, 50 million steps", () => count(50_000_000));
  const made = []; for (let i = 0; i < 500_000; i++) made.push({ situationId: `s-${i}`, builtOnVersion: i, writtenBy: "situation worker" });
  const blob = JSON.stringify(made);
  console.log(`JSON size: ${Math.round(blob.length / 1_000_000)} MB`);
  await measure("parse that JSON", () => JSON.parse(blob));
  const SaveRequest = z.object({ situationId: z.string(), builtOnVersion: z.number(), writtenBy: z.string() });
  const rows = JSON.parse(blob);
  await measure("check 500,000 objects, one at a time (Zod)", () => rows.map((r: unknown) => SaveRequest.parse(r)));
  await measure("parse and check them all at once (Zod)", () => z.array(SaveRequest).parse(JSON.parse(blob)));
  await measure("500 million steps, 1 thread", () => count(500_000_000));
  await measure("500 million steps each, 4 worker threads", () => Promise.all([0, 1, 2, 3].map(() => new Promise((done) => {
    new Worker(fileURLToPath(import.meta.url), { workerData: 500_000_000 }).once("message", done);
  }))));
  await measure("100,000 waits of 1 second, at once", () => Promise.all(Array.from({ length: 100_000 }, () => new Promise((d) => setTimeout(d, 1000)))));
}
