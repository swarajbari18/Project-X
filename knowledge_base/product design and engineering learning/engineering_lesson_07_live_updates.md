# Engineering lesson 7: how a page gets live updates

**Taught on:** 4 November 2026. This is the last lesson before plan 1 of the Situation Registrar.

**Why this is on the list now.** You want to watch Tend work: "I want to see my components on a whiteboard. I want to see them light up." A page cannot do that by default.

**This lesson came from a real project.** I built a small page with a Worker and a Durable Object, and ran it. It was not Tend's real code. It was only for teaching, so it was deleted on 4 November 2026, at Swaraj's request. The output below is copied from those runs.

**If WebSockets themselves are unclear, read lesson 8 first.** It shows them byte by byte.

**Labels:** **Measured** (it ran on this laptop, with no real network), **Fact** (the source is named at the end), **Proposal** (nobody has approved it yet).

---

## 1. The problem: a page only hears what it asked for

A browser sends a request, and the server answers. That exchange is then over.

After that, the server has no way to reach the page. So lesson 6's project could never light up a block. The page would have to ask.

---

## 2. Three ways to keep a page current

| Way | What actually happens on the network |
|---|---|
| **Asking again and again** (polling) | A new HTTP request on a timer. Each one gets an answer, and ends |
| **A one-way stream** (Server-Sent Events) | One HTTP request. The server keeps its response open, and writes a line of text each time something happens |
| **A two-way socket** (WebSocket) | One HTTP request asking to upgrade. The server answers `101`, and that same TCP connection then carries messages both ways |

**Measured,** with 20 saves, as ranges across four runs:

| Way | Typical delay | Worst delay | Requests made just to watch | Does the object sleep? |
|---|---|---|---|---|
| Asking every second | 542 to 681 ms | 970 to 1,024 ms | About one a second | Not while the asking continues (my reading, see section 4) |
| One-way stream | 21 to 22 ms | 23 to 26 ms | 1 | **No** |
| Two-way socket | 14 ms | 15 to 16 ms | 1 | **Yes** |

Asking again and again is simple, and it is a fair choice when a few seconds of delay do not matter. It costs a request every time, even when nothing changed.

**The last two are equally fast for our purposes.** Sleep is what separates them, and section 4 shows why that matters.

Tend's pages only need to listen, so a socket is more than we need. It is still the better choice here, because only a socket lets the object sleep.

---

## 3. How a socket opens

```text
Page ── one ordinary request ──▶ front door ──▶ the object for s-42
Page ◀═══ the same TCP connection stays open ═▶ the runtime, on behalf of s-42
```

**The page asks:**

```javascript
socket = new WebSocket(socketAddress);
```

**The front door passes it through the door from lesson 6:**

```typescript
if (whatIsWanted === "live" || whatIsWanted === "one-way-stream") {
  return registrar.fetch(request);
}
```

This calls the object's own `fetch`, and it is not the front door's `fetch`. Cloudflare's docs use it to hand back an open connection.

**The object keeps one end, and gives the page the other:**

```typescript
const { 0: pageEnd, 1: objectEnd } = new WebSocketPair();
this.ctx.acceptWebSocket(objectEnd);
return new Response(null, { status: 101, webSocket: pageEnd });
```

**When a version is saved, the object tells every page watching:**

```typescript
private tellEveryPageWatching(newestVersion: number): void {
  const nudge = JSON.stringify({ newestVersion });
  for (const page of this.ctx.getWebSockets()) {
    page.send(nudge);
  }
  // ...
}
```

---

## 4. The object sleeps, and the page stays connected

**Measured:** nothing happened for 40 seconds, and then one more save.

| | Did the object sleep? | Connection still open? | Did the next save reach the page? |
|---|---|---|---|
| Nobody watching | Yes | — | — |
| One-way stream | **No** | Yes | Yes |
| Two-way socket | **Yes** | **Yes** | **Yes** |

So the object left memory, the TCP connection stayed open, and the next save still reached the page. Section 5 shows how.

**Fact.** "WebSocket clients remain connected to the Cloudflare network" during hibernation, and "In-memory state is reset". After 10 seconds with nothing to do, an object that qualifies goes to sleep. When an event arrives, its constructor runs again.

**How I measured the sleep.** The object keeps its wake-up time in a plain variable, and that value changed. **So plain variables disappear while the page stays connected.** That is lesson 6's rule again: keep data in SQLite.

**Why it matters: money (my arithmetic, from Cloudflare's prices).**
- An awake object is billed for 128 MB. For a month, that is 2,592,000 seconds × 0.125 GB = 324,000 GB-s.
- At $12.50 per million GB-s, one object awake all month costs about **$4**, before the free allowance.
- An owner's screen left open all month on a one-way stream keeps its object awake all month. A sleeping object pays no duration charge for that time.

**Two things to look for when you read the agent's code.** Each one quietly stops an object from sleeping.

| In the code | What it means |
|---|---|
| `socket.accept()` | **Fact:** billed "for the entire time the WebSocket is connected". It should be `this.ctx.acceptWebSocket(...)` |
| `setInterval` or `setTimeout` inside the object | **Fact:** "No `setTimeout`/`setInterval` scheduled callbacks are set" is one of the conditions for sleeping |

---

## 5. How can a sleeping object hold a WebSocket?

**Swaraj's challenge.** "WebSocket is an active connection, active all the time. If either of the server side or the front end side goes down, the connection goes off. So your claim about the object being able to sleep in a two-way socket is kind of hard to digest." And: "Is it an actual WebSocket, or is there some other layer that is managing the networking?"

**Both answers are yes.** It is a real WebSocket, and there is another layer. That layer holds the connection, and the object does not. Every fact in the challenge is correct.

### Who holds what

In a Node.js pod running a WebSocket library:
- One process holds the TCP connection, as a file descriptor. That is the operating system's handle for an open connection.
- The same process holds your JavaScript handlers.
- So when that process stops, the operating system closes the connection.

On Cloudflare, these are two separate things:

| | What it is | When the object sleeps |
|---|---|---|
| **The runtime** | A long-running program written in C++. Locally, it is the `workerd` process. It holds the connection | It keeps running, and keeps reading the connection |
| **The object** | An instance of your class: JavaScript memory inside the runtime | Its memory is freed |

So "the object sleeps" means exactly this: the JavaScript instance is gone. The process is not gone, and the connection is not gone.

**One line of code decides this:**

| The line | What it tells the runtime | Can the object sleep? |
|---|---|---|
| `this.ctx.acceptWebSocket(objectEnd)` | "You hold this connection, and call my class when a message arrives" | Yes |
| `objectEnd.accept()` | "My running code holds this connection" | No |

**Fact, from the runtime's own source code.** "api::WebSockets cannot survive hibernation, but kj::WebSockets do." `api::WebSocket` is the JavaScript object your code sees. `kj::WebSocket` is the runtime's C++ connection. The same file says hibernating "converts our activeOrPackage from an api::WebSocket to a HibernationPackage", which keeps a few saved values such as the `url`. A loop in the runtime, `readLoop`, keeps reading the connection.

### What I did to check this

I wrote a script that hides nothing:
- It uses no WebSocket library. It opens a plain TCP connection with Node's `net` module, writes the upgrade request by hand, and builds each frame byte by byte.
- It counts how often the object was built. The class's constructor prints a line, and the script reads the server's log.
- It asks the operating system who holds the connection, using the `ss` command.

**Measured:**

| Time | What I did | What happened | What this shows |
|---|---|---|---|
| 0 s | Wrote the upgrade request by hand | `HTTP/1.1 101 Switching Protocols`, and the accept value matched the formula in the WebSocket standard | It is a real WebSocket |
| 1 s | Asked who holds the other end | `workerd, process 371508, file descriptor 45`. The constructor had run once | A runtime process holds it |
| 26 s | Sent a protocol ping | A pong came back. The constructor count stayed at 1 | The runtime answered, without your code |
| 26 s | Sent the text `ping` | `pong` came back. The count stayed at 1 | `setWebSocketAutoResponse` works the same way |
| 26 s | Asked who holds it again | The same process, and the same file descriptor | It is the same connection |
| 38 s | Sent the text `are you there` | The class's code answered. The count went to 2 | The runtime rebuilt the object to deliver it |
| 39 s | Checked a second connection, made with `accept()` | Its object never slept | The same connection type, with a different holder |
| 54 s | Saved a version from elsewhere | The nudge reached my same connection. The count went to 3 | A save can wake the object and still find the connection |
| 54 s | Killed the runtime | My connection closed 35 ms later | Your experience holds here too |

### What this does not prove

- **My laptop has an extra hop.** `ss` shows two `workerd` processes. My connection ends at the first, and the first forwards over a second connection to the other process. My reading is that your code runs in the second one. It is the same shape as an ingress in front of a pod.
- **I have not tested real Cloudflare.** Its docs say only that clients "remain connected to the Cloudflare network". Its exact layout is not public. A comment in the runtime's source says this code path is what production uses, which suggests the same design. That is my reading, and it is not proof.

### Your Kubernetes experience still applies

**The connection is as fragile here as anywhere else.**

| What you have seen | On Cloudflare |
|---|---|
| Idle connections get dropped, so you ping | **Fact:** "Cloudflare will close a WebSocket connection when no data is transmitted in either direction for a period of time." It tells you to use a client-side heartbeat |
| A server restart drops connections | **Fact:** "we may restart servers, which terminates WebSockets connections" |
| Process down means connection down | **Measured:** closed in 35 ms |

**Why pings helped you on Kubernetes (my reading of a fact).** Ingress-nginx says of `proxy-read-timeout` and `proxy-send-timeout`: "The default value of these settings is 60 seconds." So a connection that is quiet for 60 seconds gets closed by the ingress, and not by your application. Traffic resets that clock.

**What is different here: a heartbeat does not need your code running.** **Fact:** "This behavior keeps connections alive without waking the Durable Object." The measurements above agree.

**A browser cannot send a protocol ping** (from memory: the browser's WebSocket API has no ping method). So a page sends the text `ping`, and the runtime answers it.

**My page had a bug.** Its first version had no heartbeat, so a quiet page could have been closed. It would have recovered through catch-up, but it should not rely on that. It now sends `ping` every 30 seconds. I chose 30 seconds, because the page I read does not state the limit. I tested the same text with the by-hand script. I did not rerun it in Chrome, because of your rule about browser automation, and the code has since been deleted. So that heartbeat was never tested in a real browser. Whichever plan builds a live page must test it.

---

## 6. The rule: a connection is a hint, and never the truth

Connections break. Laptops close, Wi-Fi drops, and servers restart. So a page can never treat what it was told as complete.

**Measured:** two pages at version 2 lost their connection, and three saves happened while they were away.

```text
                                     only trusts messages    catches up     the truth
three saves later, connected again:          2                   5             5
```

The first page is wrong, and it looks fine. It would stay wrong until the next save.

**So the page does two things:**
1. **The object sends a nudge, not the data.** The nudge says only "something changed".
2. **The page asks the truth for what it is missing,** after every nudge, and every time it reconnects.

```javascript
async function catchUp() {
  const answer = await fetch("/situations/" + situationId + "/versions-since/" + newestVersionShown);
  for (const version of await answer.json()) {
    if (version.version_number <= newestVersionShown) continue; // A repeat does nothing.
    // show it
  }
}
```

**Why this design is good:**
- There is one path. A normal update and recovery after a break run the same code, so the recovery path is used all day, and bugs in it show up early.
- A repeated nudge does no harm. The page simply finds nothing new.
- A lost nudge does little harm. The next nudge or reconnect repairs it.

**Measured,** a restart while a page was watching:

```text
before the restart:   page shows 2
server stopped:       connection closed with code 1006. The page keeps trying.
server back:          page connected again by itself, 2.5 s after the restart began, and shows 2
one more save:        page shows 3
```

Across three runs, it took 2.5 to 4.2 seconds.

**Measured,** in two real Chrome tabs:

```text
Clicked Save in A. B was not reloaded        A: live, 1 version    B: live, 1 version    (B showed it within 70 ms)
Cut A, then clicked Save in B three times    A: away, 1 version    B: live, 4 versions
A came back by itself after 8 seconds        A: live, 4 versions   B: live, 4 versions
```

**This is lesson 1's rule on a screen:** one truth for each fact. The save to the truth waits. Everything derived does not. A page is derived. Your owner view already says so: "if a screen and the record disagree, the record is right".

**Can a nudge overtake its save?** **Fact, with a limit.** Cloudflare says storage operations use "input gates and output gates", and that "outgoing network messages" are paused "until all previous writes have been confirmed flushed to disk". That sentence sits under the `put()` method, and we use SQL. Writes on this laptop are too fast to test it. Plan 3 should confirm it for SQL on real Cloudflare.

**A crowd uses the same line.** **Measured,** as ranges across four runs, on this laptop only, where the same machine ran both sides:

| Pages watching | The save answered in | The last page knew after |
|---|---|---|
| 1 | 24 to 31 ms | 12 to 16 ms |
| 100 | 41 to 51 ms | 23 to 37 ms |
| 1,000 | 138 to 247 ms | 92 to 164 ms |

Telling pages happens inside the object's one line, so the next save waits behind it. **Fact:** one object can serve "thousands of clients". Real numbers need real Cloudflare.

---

## 7. Who may connect

**This lesson's project checks nobody.** Anyone who can type the address can watch that situation. Real Tend cannot work this way.

- **Check at the door.** A socket starts as an ordinary request. So the front door checks who is asking before it passes the request on, using the same sign-in check as any other page.
- **Check where the request came from.** **Fact:** OWASP lists "Cross-Site WebSocket Hijacking", where "Attackers hijack authenticated connections from malicious websites". Browsers send sign-in cookies along by themselves, so the front door must also check the `Origin` header.
- **The nudge helps here (my reading).** A nudge carries no business data. The data comes through an ordinary read, and that read is checked each time. So if someone's permission is removed, their next read fails, even if their connection is still open.
- **Never show a customer's words as code.** The page uses `textContent`, and never `innerHTML`. **Measured:** a message containing `<img src=x onerror=...>` showed up as plain text, and created no picture.

---

## 8. What this means for Tend (Proposal)

These are for the planning conversations, and nothing here is decided.

**The first whiteboard needs no live connection.** Its five things are the blocks, a list of runs, a timeline with next and previous, the lit block, and a click to see what went in and out. Walking a finished run comes first, and it only reads saved rows. So plan 1 may need none of this. That matches your "If we need it, then we'll have it."

**When you want to watch a run as it happens,** the run's own object can use exactly this pattern: acceptWebSocket, a nudge, and catch-up.

**The owner view comes eighth in the build order, and it has a harder problem.** Its design says a screen is built "when asked", and shows when it was last updated. Nudges fit that. But one owner's screen shows many situations, and each situation's object knows only itself. So who nudges that screen? That is open, and it belongs to the owner view's own plans.

**Deploys.** **Fact:** a deploy can make an active object "reset", and Cloudflare restarts its own servers too. I could not test what a deploy does to open connections on real Cloudflare. **Measured** locally: a stop closes them. So every page must expect its connection to drop at any time.

---

## 9. What a senior would remember

1. A page only hears what it asked for, so something must keep a connection open, or keep asking.
2. On Cloudflare, choose the socket because the object can sleep, not because it is faster.
3. The runtime holds the connection, and the object is only JavaScript memory. So the object can leave while the connection stays.
4. The connection is still fragile. It needs a heartbeat, and a page that reconnects.
5. A connection is a hint. Send a nudge, and let the page ask the truth.
6. Normal updates and recovery should be the same code.
7. A repeat should do nothing, and a loss should repair itself.
8. Check who is asking before opening the connection.

---

## Learning work

**Explain it back.** An owner leaves a situation's page open overnight. The laptop sleeps, and three versions are saved. Describe what happens, step by step, when the laptop wakes. Which line of code makes the page correct again?

**Spot it outside Tend.** A delivery app can send a notification saying "your order has moved", or send "your order is at the depot". Why is the first one safer if notifications can be lost or arrive twice? What does the app do when you open it?

---

## Sources

- WebSockets and hibernation: https://developers.cloudflare.com/durable-objects/best-practices/websockets/
- Idle connections and server restarts: https://developers.cloudflare.com/network/websockets/
- How long a connection lasts: https://developers.cloudflare.com/workers/runtime-apis/websockets/
- The runtime's source, on who holds the connection: https://github.com/cloudflare/workerd/blob/main/src/workerd/io/legacy-hibernation-manager.h
- The WebSocket standard: https://www.rfc-editor.org/rfc/rfc6455
- Ingress-nginx on WebSockets: https://kubernetes.github.io/ingress-nginx/user-guide/miscellaneous/
- Lifecycle, and the conditions for sleeping: https://developers.cloudflare.com/durable-objects/concepts/durable-object-lifecycle/
- Pricing: https://developers.cloudflare.com/durable-objects/platform/pricing/
- Limits, including what keeps an object active: https://developers.cloudflare.com/durable-objects/platform/limits/
- Code updates: https://developers.cloudflare.com/durable-objects/deployments/durable-objects-code-updates/
- SQLite storage, and output gates: https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/
- Output gates explained: https://blog.cloudflare.com/durable-objects-easy-fast-correct-choose-three/
- Server-Sent Events: https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events
- WebSocket security: https://cheatsheetseries.owasp.org/cheatsheets/WebSocket_Security_Cheat_Sheet.html
- The owner view's design: `knowledge_base/architecture/constructed_architecture_from_section12/build_view/owner_view.md`
- The whiteboard's first version: `environments_simulation_and_whiteboard.md`
