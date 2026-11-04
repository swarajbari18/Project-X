// The Worker: the front door. It holds no data. It finds the right object and asks it.
import { SituationRegistrar } from "./situation_registrar";

export { SituationRegistrar };

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const situationId = new URL(request.url).pathname.split("/")[2];
    if (!situationId) return new Response("name a situation: /situations/s-42", { status: 404 });

    const registrar = env.SITUATION_REGISTRAR.getByName(situationId);

    if (request.method === "POST") {
      try {
        const saved = await registrar.saveNewVersion(await request.json());
        return Response.json({ savedAsVersion: saved });
      } catch (error) {
        return Response.json({ refused: (error as Error).message }, { status: 409 });
      }
    }
    return Response.json({ newestVersion: await registrar.newestVersion() });
  },
};
