// The class from lesson 6, plus one new job: telling the pages that are watching.
import { DurableObject } from "cloudflare:workers";
import { isSaveRequest } from "./save_request";

type VersionRow = {
  version_number: number;
  built_on: number;
  written_by: string;
  what_changed: string;
};

export class SituationRegistrar extends DurableObject<Env> {
  // A plain variable, on purpose. If it changes, the object slept and woke up again.
  private wokeUpAt = Date.now();

  // Only for the comparison in lesson 7. An open stream exists only in memory.
  private openOneWayStreams = new Set<WritableStreamDefaultWriter>();

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    // Printed so you can see each time this object is built again.
    console.log(`ran: the constructor, for the object named ${this.ctx.id.name}`);
    // The runtime answers this text itself, without waking the object. Pages send it as a heartbeat.
    this.ctx.setWebSocketAutoResponse(new WebSocketRequestResponsePair("ping", "pong"));
    this.ctx.storage.sql.exec(`
      CREATE TABLE IF NOT EXISTS versions_of_this_situation (
        version_number INTEGER PRIMARY KEY,
        built_on       INTEGER NOT NULL,
        written_by     TEXT NOT NULL,
        what_changed   TEXT NOT NULL
      )`);
  }

  whenDidIWakeUp(): number {
    return this.wokeUpAt;
  }

  newestVersion(): number {
    const row = this.ctx.storage.sql
      .exec<{ newest: number | null }>("SELECT MAX(version_number) AS newest FROM versions_of_this_situation")
      .one();
    return row.newest ?? 0;
  }

  // What a page asks for when it needs to catch up.
  versionsSince(version: number): VersionRow[] {
    return this.ctx.storage.sql
      .exec<VersionRow>("SELECT * FROM versions_of_this_situation WHERE version_number > ? ORDER BY version_number", version)
      .toArray();
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
    this.tellEveryPageWatching(newVersion);
    return newVersion;
  }

  // A nudge, and not the data. The page then asks for what it is missing.
  private tellEveryPageWatching(newestVersion: number): void {
    const nudge = JSON.stringify({ newestVersion });
    for (const page of this.ctx.getWebSockets()) {
      page.send(nudge);
    }
    for (const stream of this.openOneWayStreams) {
      stream.write(new TextEncoder().encode(`data: ${nudge}\n\n`)).catch(() => this.openOneWayStreams.delete(stream));
    }
  }

  // The runtime calls this when a page sends a message, building the object first if it is asleep.
  webSocketMessage(socket: WebSocket, message: string | ArrayBuffer): void {
    console.log("ran: webSocketMessage");
    socket.send(JSON.stringify({ heard: String(message), iWokeUpAt: this.wokeUpAt }));
  }

  // A page asks for a live connection. The object keeps one end, and the page gets the other.
  fetch(request: Request): Response {
    if (new URL(request.url).pathname.endsWith("/one-way-stream")) {
      const { readable, writable } = new TransformStream();
      this.openOneWayStreams.add(writable.getWriter());
      return new Response(readable, { headers: { "content-type": "text/event-stream" } });
    }
    if (request.headers.get("Upgrade") !== "websocket") {
      return new Response("this address expects a WebSocket", { status: 426 });
    }
    const { 0: pageEnd, 1: objectEnd } = new WebSocketPair();
    // Only for the comparison in lesson 7: the same connection, but this object's own code holds it.
    if (new URL(request.url).pathname.endsWith("/live-plain-accept")) {
      objectEnd.accept();
      return new Response(null, { status: 101, webSocket: pageEnd });
    }
    // acceptWebSocket, and not accept: the runtime holds the connection, so the object can leave memory.
    this.ctx.acceptWebSocket(objectEnd);
    return new Response(null, { status: 101, webSocket: pageEnd });
  }
}
