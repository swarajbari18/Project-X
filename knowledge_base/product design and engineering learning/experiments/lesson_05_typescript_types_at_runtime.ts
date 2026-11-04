// Lesson 5: the TypeScript equivalent of Pydantic.
// Needs: npm install zod.  Run: node lesson_05_typescript_types_at_runtime.ts
import { z } from "zod";

const SaveRequest = z.object({
  situationId: z.string(),
  builtOnVersion: z.number(),
});
type SaveRequest = z.infer<typeof SaveRequest>; // the type comes from the run-time schema

console.log("--- 1. JavaScript itself, adding a word and a number");
console.log("five" + 1);

console.log("\n--- 2. Zod, given a word for a number");
console.log(SaveRequest.safeParse({ situationId: "s-42", builtOnVersion: "five" }).success ? "accepted" : "refused");

console.log("\n--- 3. Zod, given the text '5' for a number");
console.log(SaveRequest.safeParse({ situationId: "s-42", builtOnVersion: "5" }).success ? "accepted" : "refused");

console.log("\n--- 4. Zod, changing the value after it was checked");
const request: any = SaveRequest.parse({ situationId: "s-42", builtOnVersion: 5 });
request.builtOnVersion = "five";
console.log(JSON.stringify(request.builtOnVersion));
