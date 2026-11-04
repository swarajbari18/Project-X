// Lesson 4 experiment: where TypeScript behaves differently from Python.
// Run it yourself:  node lesson_04_reading_typescript.ts

type WhoMayWrite = "conversation manager" | "situation worker";

type SaveRequest = {
  situationId: string;
  builtOnVersion: number;
  writtenBy: WhoMayWrite;
};

let newestVersion = 5;

function pretendSavingTakesTime(): Promise<void> {
  return new Promise((finished) => setTimeout(finished, 10));
}

async function saveNewVersion(request: SaveRequest): Promise<number> {
  await pretendSavingTakesTime();
  newestVersion = request.builtOnVersion + 1;
  return newestVersion;
}

async function main() {
  console.log("--- 1. Written correctly, with await");
  const saved = await saveNewVersion({ situationId: "s-42", builtOnVersion: 5, writtenBy: "situation worker" });
  console.log("result:", saved, "| newest version is now:", newestVersion);

  console.log("\n--- 2. The same call, with await forgotten");
  newestVersion = 5;
  const forgot = saveNewVersion({ situationId: "s-42", builtOnVersion: 5, writtenBy: "situation worker" });
  console.log("result:", forgot, "| newest version is still:", newestVersion);
  await pretendSavingTakesTime();
  await pretendSavingTakesTime();
  console.log("a moment later, nobody having asked, newest version is:", newestVersion);

  console.log("\n--- 3. Types disappear when the code runs");
  newestVersion = 5;
  const fromOutside = JSON.parse('{"situationId":"s-42","builtOnVersion":"five","writtenBy":"someone unknown"}') as SaveRequest;
  const result = await saveNewVersion(fromOutside);
  console.log("TypeScript raised no complaint. The result is:", result);
}

main();
