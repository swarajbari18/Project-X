// The page. Open it in two windows, and watch one change when you save in the other.
// The script below runs in the browser. It sits inside a string, so the type checker cannot see it.
export const thePage = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>One situation, live</title>
<style>
  body { font: 16px/1.5 system-ui, sans-serif; max-width: 40rem; margin: 2rem auto; padding: 0 1rem; }
  button { font: inherit; padding: .4rem .8rem; margin: 0 .5rem .5rem 0; }
  #connection { font-weight: 600; }
</style>
</head>
<body>
<h1>Situation <span id="situation"></span></h1>
<p>Connection: <span id="connection">connecting</span></p>
<button id="save">Save a step</button>
<button id="cut">Cut the connection for 8 seconds</button>
<ol id="versions"></ol>
<script>
const situationId = new URLSearchParams(location.search).get("situation") || "s-42";
const socketAddress = location.origin.replace("http", "ws") + "/situations/" + situationId + "/live";
let newestVersionShown = 0;
let waitBeforeTryingAgain = 1000;
let stayAwayUntil = 0;
let socket;
let heartbeat;

document.getElementById("situation").textContent = situationId;

// Ask the truth for everything newer than what this page shows.
async function catchUp() {
  const answer = await fetch("/situations/" + situationId + "/versions-since/" + newestVersionShown);
  for (const version of await answer.json()) {
    if (version.version_number <= newestVersionShown) continue; // Already shown, so a repeat does nothing.
    newestVersionShown = version.version_number;
    const line = document.createElement("li");
    // textContent, and never innerHTML: a customer's words must not run as code on this page.
    line.textContent = "Written by " + version.written_by + ": " + version.what_changed;
    document.getElementById("versions").append(line);
  }
}

function connect() {
  socket = new WebSocket(socketAddress);
  socket.onopen = () => {
    document.getElementById("connection").textContent = "live";
    waitBeforeTryingAgain = 1000;
    catchUp(); // Whatever was missed while away.
    // Cloudflare closes a connection with no traffic. The runtime answers this without waking the object.
    heartbeat = setInterval(() => socket.send("ping"), 30000);
  };
  socket.onmessage = (event) => {
    if (event.data !== "pong") catchUp(); // The nudge says only that something changed.
  };
  socket.onclose = () => {
    clearInterval(heartbeat);
    document.getElementById("connection").textContent = "away, will try again";
    const wait = Math.max(waitBeforeTryingAgain, stayAwayUntil - Date.now());
    setTimeout(connect, wait);
    waitBeforeTryingAgain = Math.min(waitBeforeTryingAgain * 2, 30000);
  };
}

document.getElementById("save").onclick = async () => {
  await fetch("/situations/" + situationId, {
    method: "POST",
    body: JSON.stringify({ builtOnVersion: newestVersionShown, writtenBy: "situation worker", whatChanged: "a step saved from the page" }),
  });
};

document.getElementById("cut").onclick = () => {
  stayAwayUntil = Date.now() + 8000;
  socket.close();
};

connect();
</script>
</body>
</html>
`;
