"""Lesson 5: what Python itself enforces, and what Pydantic adds.
Needs: pip install pydantic.  Run: python3 lesson_05_python_types_at_runtime.py"""
from pydantic import BaseModel, ValidationError


def describe_version(built_on_version: int) -> str:
    return f"built on version {built_on_version}"


print("--- 1. Python's own type hints, given the wrong type")
print(describe_version("five"))

print("\n--- 2. Python's own runtime, adding a word and a number")
try:
    print("five" + 1)
except TypeError as error:
    print("TypeError:", error)


class SaveRequest(BaseModel):
    situation_id: str
    built_on_version: int


print("\n--- 3. Pydantic, given a word for a number")
try:
    SaveRequest(situation_id="s-42", built_on_version="five")
except ValidationError:
    print("refused")

print("\n--- 4. Pydantic, given the text '5' for a number")
print(repr(SaveRequest(situation_id="s-42", built_on_version="5").built_on_version))

print("\n--- 5. Pydantic, changing the value after it was checked")
request = SaveRequest(situation_id="s-42", built_on_version=5)
request.built_on_version = "five"
print(repr(request.built_on_version))

print("\n--- 6. A function with a Pydantic type, called with the wrong thing")


def save(request: SaveRequest) -> str:
    return f"saved {request}"


print(save("not a save request at all"))
