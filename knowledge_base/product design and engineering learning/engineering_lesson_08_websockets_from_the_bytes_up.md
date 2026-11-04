# Engineering lesson 8: what a WebSocket actually is

**Taught on:** 4 November 2026.

**Why this lesson exists.** Lesson 7 first called a WebSocket "a phone call", and a stream "a radio". Swaraj: "What are you explaining about one-way radio and two-way radio? Explain me how, why, exactly. This is not how you teach me stuff." So this lesson uses no comparisons. It shows the bytes.

**How I did it.** I wrote a WebSocket client and server from nothing, in plain Python, using only the `socket` module, and printed every byte. To check that I had not invented my own protocol, I connected Node's built-in WebSocket client, which is a separate implementation.
- It connected, and exchanged messages with my server.
- It also caught a bug of mine. When the client asked to close, my server hung up without answering. The standard requires a close frame back. After I fixed that, it reported a clean close.

The code was only for teaching, so it was deleted on 4 November 2026, at Swaraj's request. The output below is copied from those runs.

**Labels:** **Measured** (it ran on this laptop), **Fact** (the source is named at the end), **My reading** (my reasoning).

---

## 1. The problem

Version 8 of Meera's situation has just been saved. A page is showing version 7. How does the page find out?

To answer that, you need to see what each layer allows.

---

## 2. TCP has no rule about who speaks

A TCP connection carries bytes in both directions. Either side may write at any time.

**Measured:**

```text
client received: b'the server speaks first, and nobody asked'
server received: b'the client answers'
```

**TCP also keeps no record of where one message ends.** **Measured,** with two separate writes:

```text
client received, in one read: b'first messagesecond message'
```

Remember that second result. It is why frames exist.

---

## 3. HTTP adds a rule

HTTP runs on top of TCP, and it adds a rule: the client asks, and the server answers.

**Measured:**

```text
the client wrote:     b'GET /newest-version HTTP/1.1\r\nHost: 127.0.0.1\r\n\r\n'
the server answered:  b'HTTP/1.1 200 OK\r\nContent-Length: 1\r\nConnection: close\r\n\r\n7'
then the client read again, and got: b''   (empty means closed)
```

**So the limit comes from HTTP, and not from TCP.** Even if HTTP keeps the TCP connection open, the server may only send answers to requests. A page showing version 7 will not hear about version 8 unless it asks.

---

## 4. The handshake: an HTTP request that asks to stop being HTTP

**Fact: why it starts as HTTP.** The standard says WebSocket "is designed to work over HTTP ports 80 and 443 as well as to support HTTP proxies and intermediaries". So firewalls, load balancers and ingresses that already pass web traffic can let it through.

**Measured,** the client wrote this:

```text
GET /live HTTP/1.1
Host: 127.0.0.1
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: eqcvZ/acoY0oquJP1Ox69Q==
Sec-WebSocket-Version: 13
```

`Upgrade: websocket` says: "I would like to stop speaking HTTP on this connection."

**The server worked out its answer in three steps:**

```text
1. join the key and the standard's fixed text: eqcvZ/acoY0oquJP1Ox69Q==258EAFA5-E914-47DA-95CA-C5AB0DC85B11
2. take its SHA-1 hash: f840dc8c8d6a6801e58501dc178cc18b191c02ec
3. write that in base64: +EDcjI1qaAHlhQHcF4zBixkcAuw=
```

**And it wrote this:**

```text
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: +EDcjI1qaAHlhQHcF4zBixkcAuw=
```

**Why the calculation?** It is not for secrecy. **Fact:** "the server has to prove to the client that it received the client's WebSocket handshake, so that the server doesn't accept connections that are not WebSocket connections." An ordinary web server would not produce this value. So the client knows the server really speaks WebSocket.

**After those bytes, this TCP connection no longer carries HTTP.** It is the same connection, on the same port. It now carries frames.

---

## 5. Frames: what crosses the connection afterwards

**Why frames exist.** Section 2 showed that TCP loses the boundary between messages. So each message needs a small header that says how long it is.

**Measured:** nobody asked, and the server sent this by itself. This is the whole point of a WebSocket:

```text
all the bytes: 81 13 7b 22 6e 65 77 65 73 74 56 65 72 73 69 6f 6e 22 3a 37 7d
byte 1 is 10000001: finished = 1, kind = 1 (text)
byte 2 is 00010011: masked = 0, length = 19
the rest, as text: b'{"newestVersion":7}'
```

| The kind | What it means |
|---|---|
| 1 | Text |
| 8 | Close |
| 9 | Ping |
| 10 | Pong |

**Measured:** the client sent the text `hello`:

```text
all the bytes: 81 85 1c 2c 2f 49 74 49 43 25 73
byte 1 is 10000001: finished = 1, kind = 1 (text)
byte 2 is 10000101: masked = 1, length = 5
next 4 bytes, the mask: 1c 2c 2f 49
the rest, as sent:      74 49 43 25 73
after undoing the mask: b'hello'
```

Each byte is mixed with a byte of the mask, using XOR. For example, `h` is `68`, and `68 XOR 1c` is `74`.

**Why does only the client mask?** **Fact:** "To avoid confusing network intermediaries (such as intercepting proxies) and for security reasons … a client MUST mask all frames that it sends to the server." The standard records an experiment that "led to the poisoning of caching proxies".

**My reading of why this works.** A script on a web page chooses what the client sends. Without a mask, a malicious page could send bytes that look like an HTTP request, and fool a proxy along the way. The browser picks the mask at random, so the page cannot control the bytes on the wire.

**A mask is not encryption.** The key travels right beside the data. Encryption comes from TLS, which is what `wss://` means.

---

## 6. Why connections drop, and what a ping is for

**When nothing is being sent, no bytes flow at all.** Nothing on the wire shows that the connection is alive. That causes two separate problems. I tested both with a small box in the middle, written by me, that copies bytes both ways, as an ingress does.

**Problem 1: the box in the middle closes quiet connections.** **Measured,** with the box set to 3 seconds:

```text
nobody sends anything:          the connection closed after 3.0 seconds, with both ends still healthy
a ping every second, 7 seconds: 7 pongs came back, and the connection is still open
```

This is your Kubernetes experience. **Fact:** ingress-nginx's `proxy-read-timeout` and `proxy-send-timeout` default to 60 seconds. Neither your pod nor your page closed anything, and the ingress did. **Fact:** Cloudflare also closes connections with no traffic.

**Problem 2: a failure nobody is told about.**

If a process stops, its operating system closes the connection, and the other side finds out at once. **Measured:** my client read an empty result immediately. In lesson 7, killing the runtime closed the connection in 35 ms.

If bytes simply stop arriving, as with a cut cable, nobody is told. **Measured:**

```text
without a ping, after 4 seconds of waiting, the client saw a close: False
with a ping, and no pong within 2 seconds, the client knows:        True
```

**So a ping has two jobs.** **Fact:** "A Ping frame may serve either as a keepalive or as a means to verify that the remote endpoint is still responsive."

---

## 7. What one-way and two-way mean, exactly

**Measured:** this is Server-Sent Events on the wire. The client sent one normal HTTP request, and this answer came back:

```text
the response's start:
   b'HTTP/1.1 200 OK\r\nContent-Type: text/event-stream\r\n\r\n'
later, the same response continues:
   b'data: {"newestVersion":7}\n\n'
later, the same response continues:
   b'data: {"newestVersion":8}\n\n'
```

There are no frames. It is lines of text, inside one HTTP response that does not end.

**"One-way" is not about the wire.** TCP carries bytes both ways in every case here. It is about the rules on top. Under HTTP, once the client has sent its request, it has no format for saying anything more on that connection. To send something, it must make a new request. Under WebSocket, both sides have frames.

| | Asking again and again | Server-Sent Events | WebSocket |
|---|---|---|---|
| TCP connections | A new request each time | One | One |
| What the server sends | A whole HTTP response each time | Lines of text inside one response | Frames |
| Can the server send without being asked? | No | Yes | Yes |
| Can the client send on the same connection? | Only its next request | No | Yes |
| Does the browser reconnect by itself? | It asks again anyway | Yes (**Fact**) | No. You write that code |

---

## 8. How an object can sleep while the connection stays

In a normal server, one process holds the socket and runs your handlers. That is why you found the claim hard to accept.

To show that the two can be separated, I wrote a small model in Python. **It is not Cloudflare's code.** One loop owns the socket, and your object exists only while there is work. The model frees the object after 2 idle seconds.

**Measured:**

```text
   the runtime holds the socket, file descriptor 4
client sends a message:
   constructor ran: an object now exists in memory
   client read: b'the object handled: first message'

nothing happens for 3 seconds:
   object freed. The socket is still open, file descriptor 4

client sends a ping:
   the runtime answered the ping itself. Object exists: False
   client read: pong

client sends another message, on the same connection:
   constructor ran: an object now exists in memory
   client read: b'the object handled: second message'
```

Lesson 7, section 5, shows that Cloudflare's real runtime behaves this way, including what its source code says, and what I could not test.

---

## 9. What a senior would remember

1. TCP lets either side write at any time. HTTP adds the rule that the client asks first.
2. A WebSocket starts as an HTTP request. After `101`, the same connection carries frames.
3. Frames exist because TCP keeps no record of where a message ends.
4. Clients mask their frames so that proxies cannot be fooled. A mask is not encryption.
5. A quiet connection sends no bytes, so boxes in the middle may close it.
6. A silent failure can only be found by sending something. So a ping has two jobs.
7. One-way and two-way are rules about who may send, and not a property of the wire.

---

## Learning work

**Read the bytes.** These bytes crossed a WebSocket: `81 05 68 65 6c 6c 6f`. Who sent them, the client or the server? What kind of frame is it, and what does it say? How do you know?

**Explain it back.** Why can a client not find out about a cut cable just by waiting?

---

## Sources

- The WebSocket standard, RFC 6455: https://www.rfc-editor.org/rfc/rfc6455
- Server-Sent Events, in the HTML standard: https://html.spec.whatwg.org/multipage/server-sent-events.html
- Ingress-nginx on WebSockets: https://kubernetes.github.io/ingress-nginx/user-guide/miscellaneous/
- Cloudflare on WebSocket idle timeouts: https://developers.cloudflare.com/network/websockets/
