// What a request to save must look like, and the check that runs when the code runs.

export type WhoMayWrite = "conversation manager" | "situation worker";

export type SaveRequest = {
  builtOnVersion: number;
  writtenBy: WhoMayWrite;
  whatChanged: string;
};

export function isSaveRequest(value: unknown): value is SaveRequest {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return typeof v.builtOnVersion === "number"
    && (v.writtenBy === "conversation manager" || v.writtenBy === "situation worker")
    && typeof v.whatChanged === "string";
}
