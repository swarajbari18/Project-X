// Lesson 4: the checker and the program are two separate moments.
// Run it:    node lesson_04_two_moments.ts          (it runs, with no complaint)
// Check it:  npx -p typescript tsc --noEmit --strict lesson_04_two_moments.ts   (it refuses)

type WhoMayWrite = "conversation manager" | "situation worker";

function describe(writer: WhoMayWrite) {
  return `written by ${writer}`;
}

console.log(describe("owner view"));

const fromOutside: unknown = JSON.parse('{"writtenBy":"someone unknown"}');
console.log(fromOutside.writtenBy);
