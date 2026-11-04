// This file is meant to fail. Check it with the TypeScript compiler; it never runs.

type WhoMayWrite = "conversation manager" | "situation worker";

type SaveRequest = {
  situationId: string;
  builtOnVersion: number;
  writtenBy: WhoMayWrite;
};

declare function saveNewVersion(request: SaveRequest): Promise<number>;

// Mistake 1: a part that may never write.
saveNewVersion({ situationId: "s-42", builtOnVersion: 5, writtenBy: "owner view" });

// Mistake 2: a field left out.
saveNewVersion({ situationId: "s-42", writtenBy: "situation worker" });

// Mistake 3: the same bad value as mistake 1, with the checker told to look away. No error here.
saveNewVersion({ situationId: "s-42", builtOnVersion: 5, writtenBy: "owner view" } as any);
