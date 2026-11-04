"""Lesson 4: the forgotten await, in Python. Run: python3 lesson_04_the_same_mistake_in_python.py"""
import asyncio

newest_version = 5

async def save_new_version():
    global newest_version
    await asyncio.sleep(0.01)
    newest_version = 6
    return newest_version

async def main():
    forgot = save_new_version()   # await forgotten
    print("result:", forgot, "| newest version is still:", newest_version)
    await asyncio.sleep(0.05)
    print("a moment later, newest version is:", newest_version)

asyncio.run(main())
