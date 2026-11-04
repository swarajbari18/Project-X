// The Durable Object class. Cloudflare makes one object from it per name, each with its own SQLite.
import { DurableObject } from "cloudflare:workers";
import { isSaveRequest } from "./save_request";

export class SituationRegistrar extends DurableObject<Env> {
  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    this.ctx.storage.sql.exec(`
      CREATE TABLE IF NOT EXISTS versions_of_this_situation (
        version_number INTEGER PRIMARY KEY,
        built_on       INTEGER NOT NULL,
        written_by     TEXT NOT NULL,
        what_changed   TEXT NOT NULL
      )`);
  }

  newestVersion(): number {
    const row = this.ctx.storage.sql
      .exec<{ newest: number | null }>("SELECT MAX(version_number) AS newest FROM versions_of_this_situation")
      .one();
    return row.newest ?? 0;
  }

  saveNewVersion(request: unknown): number {
    if (!isSaveRequest(request)) {
      throw new Error("the save request has the wrong shape");
    }
    const newest = this.newestVersion();
    if (request.builtOnVersion !== newest) {
      throw new Error(`a newer version exists: the newest is ${newest}`);
    }
    const newVersion = newest + 1;
    this.ctx.storage.sql.exec(
      "INSERT INTO versions_of_this_situation VALUES (?, ?, ?, ?)",
      newVersion, request.builtOnVersion, request.writtenBy, request.whatChanged,
    );
    return newVersion;
  }
}
