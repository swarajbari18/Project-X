"""Lesson 5: Python's side of the speed comparison. Needs: pip install pydantic."""
import asyncio, json, multiprocessing, threading, time
from pydantic import BaseModel, TypeAdapter


def measure(name, work):
    start = time.perf_counter(); work(); print(f"{name}: {(time.perf_counter()-start)*1000:,.0f} ms")


def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)


def count(n):
    total = 0
    for i in range(n):
        total += i * 2 % 7
    return total


def threaded(k, each):
    ts = [threading.Thread(target=count, args=(each,)) for _ in range(k)]
    [t.start() for t in ts]; [t.join() for t in ts]


def processes(k, each):
    ps = [multiprocessing.Process(target=count, args=(each,)) for _ in range(k)]
    [p.start() for p in ps]; [p.join() for p in ps]


if __name__ == "__main__":
    measure("recursive fib(35)", lambda: fib(35))
    measure("loop, 50 million steps", lambda: count(50_000_000))

    blob = json.dumps([{"situationId": f"s-{i}", "builtOnVersion": i, "writtenBy": "situation worker"} for i in range(500_000)])
    print(f"JSON size: {len(blob)/1_000_000:.0f} MB")
    measure("parse that JSON", lambda: json.loads(blob))


    class SaveRequest(BaseModel):
        situationId: str
        builtOnVersion: int
        writtenBy: str


    rows = json.loads(blob)
    measure("check 500,000 objects, one at a time (Pydantic)", lambda: [SaveRequest.model_validate(r) for r in rows])
    measure("parse and check them all at once (Pydantic, in Rust)", lambda: TypeAdapter(list[SaveRequest]).validate_json(blob))
    del rows, blob
    measure("30 million steps, 1 thread", lambda: count(30_000_000))
    measure("30 million steps each, 4 threads", lambda: threaded(4, 30_000_000))
    measure("30 million steps each, 4 processes", lambda: processes(4, 30_000_000))


async def waits(n):
    await asyncio.gather(*[asyncio.sleep(1) for _ in range(n)])

if __name__ == "__main__":
    measure("100,000 waits of 1 second, at once", lambda: asyncio.run(waits(100_000)))
