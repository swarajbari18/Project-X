// Cloudflare does not care what this file is called. It looks at what this file exports.
import { SituationRegistrar } from "./situation_registrar";

// A named export: this is how Cloudflare finds the Durable Object class.
export { SituationRegistrar };

// The default export, with fetch: Cloudflare calls this for every request that arrives.
export default {
  // Cloudflare passes in env. It holds one door for each binding in wrangler.jsonc.
  async fetch(request: Request, env: Env): Promise<Response> {
    // /situations/s-42 gives "s-42". This name came from the caller, and nothing here checks it.
    const situationId = new URL(request.url).pathname.split("/")[2];
    if (!situationId) return new Response("name a situation: /situations/s-42", { status: 404 });

    // Not the object, and not its data. A stand-in for the object, which may be elsewhere.
    const registrar = env.SITUATION_REGISTRAR.getByName(situationId);

    if (request.method === "POST") {
      try {
        // This line is the call to the real object. Its code runs there, and the answer comes back.
        const saved = await registrar.saveNewVersion(await request.json());
        return Response.json({ savedAsVersion: saved });
      } catch (error) {
        return Response.json({ refused: (error as Error).message }, { status: 409 });
      }
    }
    return Response.json({ newestVersion: await registrar.newestVersion() });
  },
};
