"""Lesson 6: break one thing at a time, and see what each line really does.

First run `npm install` inside lesson_06_tiny_cloudflare_project. Then, from this folder:

    python3 lesson_06_break_it_on_purpose.py

It works on throwaway copies, so the project itself is never changed. It sends nothing to Cloudflare.
"""
import glob, json, os, re, shutil, signal, sqlite3, subprocess, tempfile, time, urllib.error, urllib.request

PROJECT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "lesson_06_tiny_cloudflare_project")
CLEAN_ENV = {**os.environ, "WRANGLER_SEND_METRICS": "false", "NO_COLOR": "1"}
next_port = [8810]

GOOD_SAVE_0 = {"builtOnVersion": 0, "writtenBy": "conversation manager", "whatChanged": "Meera wrote"}
GOOD_SAVE_1 = {"builtOnVersion": 1, "writtenBy": "situation worker", "whatChanged": "the carrier answered"}
LATE_SAVE = {"builtOnVersion": 1, "writtenBy": "situation worker", "whatChanged": "too late"}
BAD_SHAPE = {"builtOnVersion": "five", "writtenBy": "someone unknown", "whatChanged": "x"}


def config(folder, main="src/front_door.ts", exports=True, door_name="SITUATION_REGISTRAR", door=True):
    c = {"name": "tiny-situation-registrar", "main": main, "compatibility_date": "2026-11-04"}
    if exports:
        c["exports"] = {"SituationRegistrar": {"type": "durable-object", "storage": "sqlite"}}
    if door:
        c["durable_objects"] = {"bindings": [{"name": door_name, "class_name": "SituationRegistrar"}]}
    write(folder, "wrangler.jsonc", json.dumps(c, indent=2))


def read(folder, name):
    return open(os.path.join(folder, name)).read()


def write(folder, name, text):
    open(os.path.join(folder, name), "w").write(text)


def replace(folder, name, old, new):
    text = read(folder, name)
    assert old in text, f"{old!r} is not in {name}"
    write(folder, name, text.replace(old, new))


def first_line(text):
    return text.strip().splitlines()[0][:150] if text.strip() else ""


def send(port, path, body=None):
    data = json.dumps(body).encode() if body is not None else None
    request = urllib.request.Request(f"http://localhost:{port}{path}", data=data, method="POST" if data else "GET")
    try:
        with urllib.request.urlopen(request, timeout=15) as answer:
            return f"{answer.status} {first_line(answer.read().decode())}"
    except urllib.error.HTTPError as error:
        return f"{error.code} {first_line(error.read().decode())}"
    except Exception as error:
        return f"no answer: {error}"


def sqlite_files(folder):
    found = glob.glob(os.path.join(folder, ".wrangler/state/v3/do/*/*.sqlite"))
    return sorted(os.path.basename(f) for f in found if "metadata" not in f)


def make_copy(change=None):
    folder = tempfile.mkdtemp(prefix="lesson06-")
    for item in ("src", "tsconfig.json", "package.json"):
        source = os.path.join(PROJECT, item)
        (shutil.copytree if os.path.isdir(source) else shutil.copy)(source, os.path.join(folder, item))
    os.symlink(os.path.join(PROJECT, "node_modules"), os.path.join(folder, "node_modules"))
    write(folder, "tsconfig.json", read(folder, "tsconfig.json").replace('"src", "test", ', '"src", '))
    config(folder)
    if change:
        change(folder)
    return folder


def start_server(folder):
    next_port[0] += 1
    port = next_port[0]
    log_path = os.path.join(folder, f"dev{port}.log")
    log = open(log_path, "w")
    server = subprocess.Popen(["npx", "wrangler", "dev", "--port", str(port)], cwd=folder, env=CLEAN_ENV,
                              stdout=log, stderr=subprocess.STDOUT, start_new_session=True)
    for _ in range(40):
        if server.poll() is not None or "Ready on" in open(log_path).read():
            break
        time.sleep(0.5)
    started = server.poll() is None and "Ready on" in open(log_path).read()
    if started:
        time.sleep(0.5)
    return server, port, log_path, started


def stop_server(server):
    if server.poll() is None:
        os.killpg(server.pid, signal.SIGTERM)
        try:
            server.wait(timeout=8)
        except subprocess.TimeoutExpired:
            os.killpg(server.pid, signal.SIGKILL)


def heading(title):
    print(f"\n{'=' * 78}\n{title}\n{'=' * 78}")


def run_case(title, change=None, script=None):
    heading(title)
    folder = make_copy(change)
    try:
        # Moment 1: before running.
        subprocess.run(["npx", "wrangler", "types"], cwd=folder, env=CLEAN_ENV, capture_output=True, text=True)
        checker = subprocess.run(["npx", "tsc", "--noEmit"], cwd=folder, env=CLEAN_ENV, capture_output=True, text=True)
        errors = [l for l in checker.stdout.splitlines() if "error TS" in l and "worker-configuration" not in l]
        print("TYPE CHECK: " + ("passed" if not errors else f"refused ({len(errors)})"))
        for line in errors[:2]:
            print("   " + line[:150])

        # Moment 2: running.
        server, port, log_path, started = start_server(folder)
        print("STARTS: " + ("yes" if started else "NO, it refused to start"))
        if started:
            script(folder, port)
        stop_server(server)
        text = re.sub(r"\x1b\[[0-9;]*m", "", open(log_path).read())
        wanted = [l.strip() for l in text.splitlines() if re.search(
            r"✘|ran:|TypeError|does not|not exported", l) and not l.lstrip().startswith("{")]
        shown = []
        for line in wanted:
            if line not in shown:
                shown.append(line)
        if shown:
            print("WHAT IT PRINTED:")
            for line in shown[:5]:
                print("   " + line[:210])
    finally:
        shutil.rmtree(folder, ignore_errors=True)


def say(port, what, path, body=None):
    print(f"   {what:<42} {send(port, path, body)}")


def normal_story(folder, port):
    say(port, "s-42, ask the newest version", "/situations/s-42")
    say(port, "s-42, save built on 0", "/situations/s-42", GOOD_SAVE_0)
    say(port, "s-42, save built on 1", "/situations/s-42", GOOD_SAVE_1)
    say(port, "s-42, save built on an old version", "/situations/s-42", LATE_SAVE)
    say(port, "s-42, wrong shape", "/situations/s-42", BAD_SHAPE)
    say(port, "s-43, a different situation", "/situations/s-43")


def one_call(folder, port):
    say(port, "s-42, ask the newest version", "/situations/s-42")


# ---------- the changes ----------

def all_in_one_file(folder):
    def body(name):
        text = read(folder, f"src/{name}.ts")
        os.remove(os.path.join(folder, f"src/{name}.ts"))
        text = re.sub(r'^import \{ (isSaveRequest|SituationRegistrar) \}.*$', "", text, flags=re.M)
        return re.sub(r"^export \{ SituationRegistrar \};$", "", text, flags=re.M)
    write(folder, "src/any_name_at_all.ts", body("save_request") + body("situation_registrar") + body("front_door"))
    config(folder, main="src/any_name_at_all.ts")


def no_default_export(folder):
    replace(folder, "src/front_door.ts", "export default {", "const notExported = {")


def fetch_renamed(folder):
    replace(folder, "src/front_door.ts", "async fetch(request: Request, env: Env)", "async somethingElse(request: Request, env: Env)")


def no_named_export(folder):
    replace(folder, "src/front_door.ts", "export { SituationRegistrar };", "")


def no_exports_block(folder):
    config(folder, exports=False)


def no_door(folder):
    config(folder, door=False)


def door_called_banana(folder):
    config(folder, door_name="BANANA")
    replace(folder, "src/front_door.ts", "env.SITUATION_REGISTRAR", "env.BANANA")


def class_is_plain(folder):
    replace(folder, "src/situation_registrar.ts", 'import { DurableObject } from "cloudflare:workers";\n', "")
    replace(folder, "src/situation_registrar.ts",
            "export class SituationRegistrar extends DurableObject<Env> {\n  constructor(ctx: DurableObjectState, env: Env) {\n    super(ctx, env);",
            "export class SituationRegistrar {\n  ctx: DurableObjectState;\n  constructor(ctx: DurableObjectState, env: Env) {\n    this.ctx = ctx;")


def add_name_routes(folder):
    replace(folder, "src/front_door.ts",
            "    // /situations/s-42 gives",
            """    const parts = new URL(request.url).pathname.split("/");
    if (parts[1] === "id-of") return new Response(env.SITUATION_REGISTRAR.idFromName(parts[2]).toString());
    if (parts[1] === "only-get-by-name") { env.SITUATION_REGISTRAR.getByName(parts[2]); return new Response("getByName ran; no method called"); }
    // /situations/s-42 gives""")


def name_becomes_a_file(folder, port):
    say(port, "call getByName('s-99'), and nothing else", "/only-get-by-name/s-99")
    print(f"   SQLite files for objects on disk now:      {len(sqlite_files(folder))}")
    ids = {name: send(port, f"/id-of/{name}").split(" ")[1] for name in ("s-99", "S-99")}
    again = send(port, "/id-of/s-99").split(" ")[1]
    print(f"   the ID worked out from 's-99':             {ids['s-99'][:24]}...")
    print(f"   worked out again from 's-99':              {again[:24]}...  same: {again == ids['s-99']}")
    print(f"   worked out from 'S-99', capital S:         {ids['S-99'][:24]}...  same: {ids['S-99'] == ids['s-99']}")
    say(port, "now call a method on s-99", "/situations/s-99")
    files = sqlite_files(folder)
    print(f"   SQLite files for objects on disk now:      {len(files)}")
    if files:
        print(f"   that file's name:                          {files[0][:24]}...")
        print(f"   its name is exactly the ID:                {files[0] == ids['s-99'] + '.sqlite'}")


def add_who_am_i(folder):
    write(folder, "src/shared_counter.ts", "export const shared = { touched: 0 };\n")
    replace(folder, "src/situation_registrar.ts", 'import { isSaveRequest } from "./save_request";',
            'import { isSaveRequest } from "./save_request";\nimport { shared } from "./shared_counter";')
    replace(folder, "src/situation_registrar.ts", "  newestVersion(): number {",
            """  whoAmI() {
    shared.touched++;
    console.log(`ran: the class's whoAmI, for the object named ${this.ctx.id.name}`);
    return { myName: this.ctx.id.name, doorsIHold: Object.keys(this.env), touchedInMyCopy: shared.touched };
  }

  newestVersion(): number {""")
    replace(folder, "src/front_door.ts", 'import { SituationRegistrar } from "./situation_registrar";',
            'import { SituationRegistrar } from "./situation_registrar";\nimport { shared } from "./shared_counter";')
    replace(folder, "src/front_door.ts", "    // /situations/s-42 gives",
            """    const route = new URL(request.url).pathname.split("/");
    if (route[1] === "who") {
      shared.touched++;
      console.log("ran: the fetch code");
      const before = shared.touched;
      const object = await env.SITUATION_REGISTRAR.getByName(route[2]).whoAmI();
      return Response.json({ touchedInTheFetchCopy: before, object });
    }
    // /situations/s-42 gives""")


def who_am_i(folder, port):
    say(port, "first call, to s-42", "/who/s-42")
    say(port, "second call, to s-42", "/who/s-42")
    say(port, "third call, to s-43", "/who/s-43")


def no_doors_at_all(folder):
    config(folder, exports=False, door=False)
    write(folder, "src/front_door.ts", """export default {
  async fetch(): Promise<Response> {
    const answer = await fetch("https://example.com");
    return new Response(`no binding at all, and the public internet answered: ${answer.status}`);
  },
};
""")
    os.remove(os.path.join(folder, "src/situation_registrar.ts"))
    os.remove(os.path.join(folder, "src/save_request.ts"))


def what_ships():
    heading("11. WHAT ACTUALLY SHIPS (a dry run: nothing is sent to Cloudflare)")
    folder = make_copy()
    try:
        write(folder, "src/never_imported.ts", 'export const marker = "NOTHING_IMPORTS_THIS_FILE";\n')
        subprocess.run(["npx", "wrangler", "deploy", "--dry-run", "--outdir", "shipped"], cwd=folder, env=CLEAN_ENV,
                       capture_output=True, text=True)
        code_files = [f for f in os.listdir(os.path.join(folder, "shipped")) if f.endswith(".js")]
        print(f"   code files that ship:                      {len(code_files)}  ({', '.join(code_files)})")
        bundle = read(folder, os.path.join("shipped", code_files[0]))
        print(f"   holds the fetch code:                      {'async fetch(request, env)' in bundle}")
        print(f"   holds the Durable Object class:            {'SituationRegistrar = class' in bundle}")
        print(f"   holds the shape check:                     {'function isSaveRequest' in bundle}")
        print(f"   holds a file nothing imports:              {'NOTHING_IMPORTS_THIS_FILE' in bundle}")
        print("   how the file ends:")
        print("      " + " ".join(bundle[bundle.rindex("export {"):].split()))
    finally:
        shutil.rmtree(folder, ignore_errors=True)


def survives_a_restart():
    heading("12. ONE SITUATION IS ONE SQLITE FILE, AND IT SURVIVES A RESTART")
    folder = make_copy()
    try:
        server, port, _, _ = start_server(folder)
        say(port, "s-42, save built on 0", "/situations/s-42", GOOD_SAVE_0)
        say(port, "s-42, save built on 1", "/situations/s-42", GOOD_SAVE_1)
        say(port, "s-43, only asked its newest version", "/situations/s-43")
        stop_server(server)
        for path in sorted(glob.glob(os.path.join(folder, ".wrangler/state/v3/do/*/*.sqlite"))):
            if "metadata" not in path:
                rows = sqlite3.connect(path).execute("select * from versions_of_this_situation").fetchall()
                print(f"   file {os.path.basename(path)[:16]}...sqlite holds: {rows}")
        server, port, _, _ = start_server(folder)
        say(port, "after stopping and restarting: s-42", "/situations/s-42")
        stop_server(server)
    finally:
        shutil.rmtree(folder, ignore_errors=True)


run_case("0. THE PROJECT AS IT IS", script=normal_story)
run_case("1. EVERY LINE MOVED INTO ONE FILE, with any name at all", all_in_one_file, normal_story)
run_case("2. REMOVE  export default { fetch }", no_default_export, one_call)
run_case("2b. KEEP THE DEFAULT EXPORT, BUT RENAME fetch", fetch_renamed, one_call)
run_case("3. REMOVE  export { SituationRegistrar }", no_named_export, one_call)
run_case('4. REMOVE the "exports" block from wrangler.jsonc', no_exports_block, normal_story)
run_case('5. REMOVE the "durable_objects" bindings block from wrangler.jsonc', no_door, one_call)
run_case("6. RENAME THE DOOR to BANANA, in wrangler.jsonc and in the code", door_called_banana, normal_story)
run_case("7. THE CLASS NO LONGER SAYS  extends DurableObject", class_is_plain, one_call)
run_case("8. HOW A NAME BECOMES ONE OBJECT", add_name_routes, name_becomes_a_file)
run_case("9. WHAT DOES THE OBJECT KNOW, AND DOES IT SHARE MEMORY WITH THE FETCH CODE?", add_who_am_i, who_am_i)
run_case("10. NO BINDINGS AT ALL. CAN THE CODE STILL REACH THE PUBLIC INTERNET?", no_doors_at_all,
         lambda folder, port: say(port, "call the fetch code", "/"))
what_ships()
survives_a_restart()
