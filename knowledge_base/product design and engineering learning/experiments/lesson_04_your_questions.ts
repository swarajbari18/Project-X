// Lesson 4: Swaraj's questions, run. Run it:  node lesson_04_your_questions.ts

type WhoMayWrite = "conversation manager" | "situation worker";
type SaveRequest = { situationId: string; builtOnVersion: number; writtenBy: WhoMayWrite };

// ---------- 1. "as" converts nothing
console.log("--- 1. Does `as` convert anything?");
const text: unknown = "five";
const pretendNumber = text as number;
console.log("its real type:", typeof pretendNumber, "| plus one:", pretendNumber + 1);
console.log("Python's int() converts. `as` only tells the checker a story.\n");

// ---------- 2. a real shape check
console.log("--- 2. A shape check, at run time");
function isSaveRequest(value: unknown): value is SaveRequest {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return typeof v.situationId === "string"
    && typeof v.builtOnVersion === "number"
    && (v.writtenBy === "conversation manager" || v.writtenBy === "situation worker");
}
const good = JSON.parse('{"situationId":"s-42","builtOnVersion":5,"writtenBy":"situation worker"}');
const bad = JSON.parse('{"situationId":"s-42","builtOnVersion":"five","writtenBy":"someone unknown"}');
console.log("the good one passes:", isSaveRequest(good));
console.log("the bad one passes: ", isSaveRequest(bad), "\n");

// ---------- 3. the order things really happen in
class TheRefusalWasIgnored extends Error {}
let refuseTheSave = false;
function step(message: string) { console.log("  " + message); }

async function saveNewVersion(): Promise<number> {
  step("save: started");
  await new Promise((finished) => setTimeout(finished, 10));
  if (refuseTheSave) { step("save: REFUSED, a newer version exists"); throw new TheRefusalWasIgnored("a newer version exists"); }
  step("save: finished");
  return 7;
}

async function forgotAwait(): Promise<string> {
  step("outer function: before the save line");
  saveNewVersion();
  step("outer function: after the save line");
  return "saved";
}

async function rememberedAwait(): Promise<string> {
  step("outer function: before the save line");
  await saveNewVersion();
  step("outer function: after the save line");
  return "saved";
}

const pause = () => new Promise((finished) => setTimeout(finished, 30));

process.on("unhandledRejection", (reason) => {
  step(`nobody was listening for this error: ${(reason as Error).message}`);
});

async function main() {
  console.log("--- 3. await forgotten, and the save succeeds");
  step("result: " + await forgotAwait());
  await pause();

  console.log("\n--- 4. await forgotten, and the save is REFUSED");
  refuseTheSave = true;
  step("result: " + await forgotAwait());
  await pause();

  console.log("\n--- 5. await present, and the save succeeds");
  refuseTheSave = false;
  step("result: " + await rememberedAwait());

  console.log("\n--- 6. await present, and the save is REFUSED");
  refuseTheSave = true;
  try {
    step("result: " + await rememberedAwait());
  } catch (error) {
    step(`the caller was told: ${(error as Error).message}`);
  }

  console.log("\n--- 7. Each async call gets its own promise");
  refuseTheSave = false;
  const outer = forgotAwait();
  step("the outer function's promise is one thing: " + (outer instanceof Promise));
  await outer;
  step("the outer promise is finished, while the inner save still runs:");
  await pause();
}

main();
