// The front door from lesson 6, plus the page and the live connection.
import { thePage } from "./page";

export { SituationRegistrar } from "./situation_registrar";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // /situations/s-42/versions-since/3 gives "s-42", "versions-since" and "3".
    const [, , situationId, whatIsWanted, sinceVersion] = new URL(request.url).pathname.split("/");

    if (!situationId) {
      return new Response(thePage, { headers: { "content-type": "text/html; charset=utf-8" } });
    }

    const registrar = env.SITUATION_REGISTRAR.getByName(situationId);

    // A live connection starts as an ordinary request, passed through the door to the object.
    // In real Tend, this is where the front door must check who is asking. This lesson checks nothing.
    if (whatIsWanted === "live" || whatIsWanted === "one-way-stream") {
      return registrar.fetch(request);
    }
    if (whatIsWanted === "versions-since") {
      return Response.json(await registrar.versionsSince(Number(sinceVersion)));
    }
    if (whatIsWanted === "when-did-you-wake-up") {
      return Response.json({ wokeUpAt: await registrar.whenDidIWakeUp() });
    }
    if (request.method === "POST") {
      try {
        return Response.json({ savedAsVersion: await registrar.saveNewVersion(await request.json()) });
      } catch (error) {
        return Response.json({ refused: (error as Error).message }, { status: 409 });
      }
    }
    return Response.json({ newestVersion: await registrar.newestVersion() });
  },
};
