// These run inside Cloudflare's real runtime, on this machine.
import { env } from "cloudflare:workers";
import { describe, expect, it } from "vitest";

const worker = "situation worker";

// Runs an attempt, and says what it was refused for. Returns null if it was not refused.
async function refusalFrom(attempt: () => Promise<unknown>): Promise<string | null> {
  try {
    await attempt();
    return null;
  } catch (error) {
    return (error as Error).message;
  }
}

describe("saving a version", () => {
  it("SR-01: a save on the newest version is accepted", async () => {
    const registrar = env.SITUATION_REGISTRAR.getByName("test-a");
    await registrar.saveNewVersion({ builtOnVersion: 0, writtenBy: "conversation manager", whatChanged: "Meera wrote" });
    expect(await registrar.saveNewVersion({ builtOnVersion: 1, writtenBy: worker, whatChanged: "carrier answered" })).toBe(2);
  });

  it("SR-02: a save on an old version is refused", async () => {
    const registrar = env.SITUATION_REGISTRAR.getByName("test-b");
    await registrar.saveNewVersion({ builtOnVersion: 0, writtenBy: "conversation manager", whatChanged: "Priya wrote" });
    const refusal = await refusalFrom(() => registrar.saveNewVersion({ builtOnVersion: 0, writtenBy: worker, whatChanged: "too late" }));
    expect(refusal).toContain("a newer version exists");
    expect(await registrar.newestVersion()).toBe(1);
  });

  it("a wrong shape is refused, at run time", async () => {
    const registrar = env.SITUATION_REGISTRAR.getByName("test-c");
    const refusal = await refusalFrom(() => registrar.saveNewVersion({ builtOnVersion: "five", writtenBy: "someone unknown", whatChanged: "x" }));
    expect(refusal).toContain("the save request has the wrong shape");
    expect(await registrar.newestVersion()).toBe(0);
  });

  it("one situation never sees another", async () => {
    const meerasLateDelivery = env.SITUATION_REGISTRAR.getByName("s-42");
    const priyasRefund = env.SITUATION_REGISTRAR.getByName("s-43");
    await meerasLateDelivery.saveNewVersion({ builtOnVersion: 0, writtenBy: worker, whatChanged: "x" });
    expect(await meerasLateDelivery.newestVersion()).toBe(1);
    expect(await priyasRefund.newestVersion()).toBe(0);
  });
});
