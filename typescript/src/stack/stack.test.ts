import { describe, expect, it } from "vitest";
import { Stack } from "./starter";

describe("Stack", () => {
  it("starts empty", () => {
    const stack = new Stack<number>();
    expect(stack.size).toBe(0);
    expect(stack.isEmpty()).toBe(true);
  });

  it("grows with each push", () => {
    const stack = new Stack<number>();
    stack.push(1);
    stack.push(2);
    expect(stack.size).toBe(2);
    expect(stack.isEmpty()).toBe(false);
  });

  it("peeks at the last pushed value without removing it", () => {
    const stack = new Stack<number>();
    stack.push(1);
    stack.push(2);
    expect(stack.peek()).toBe(2);
    expect(stack.size).toBe(2);
  });

  it("pops values in LIFO order", () => {
    const stack = new Stack<number>();
    stack.push(1);
    stack.push(2);
    stack.push(3);
    expect(stack.pop()).toBe(3);
    expect(stack.pop()).toBe(2);
    expect(stack.pop()).toBe(1);
    expect(stack.size).toBe(0);
  });

  it("returns undefined from pop and peek when empty", () => {
    const stack = new Stack<number>();
    expect(stack.pop()).toBeUndefined();
    expect(stack.peek()).toBeUndefined();
    expect(stack.size).toBe(0);
  });

  it("can be reused after being emptied", () => {
    const stack = new Stack<number>();
    stack.push(1);
    stack.pop();
    expect(stack.isEmpty()).toBe(true);
    stack.push(2);
    expect(stack.peek()).toBe(2);
    expect(stack.size).toBe(1);
  });

  it("keeps LIFO order when push and pop are interleaved", () => {
    const stack = new Stack<number>();
    stack.push(1);
    stack.push(2);
    expect(stack.pop()).toBe(2);
    stack.push(3);
    expect(stack.pop()).toBe(3);
    expect(stack.pop()).toBe(1);
  });

  it("iterates from top to bottom without modifying the stack", () => {
    const stack = new Stack<number>();
    stack.push(1);
    stack.push(2);
    stack.push(3);
    expect([...stack]).toEqual([3, 2, 1]);
    expect([...stack]).toEqual([3, 2, 1]);
    expect(stack.size).toBe(3);
  });

  it("works with non-numeric values", () => {
    const stack = new Stack<string>();
    stack.push("a");
    stack.push("b");
    expect(stack.pop()).toBe("b");
    expect(stack.peek()).toBe("a");
  });

  it("stores falsy values like any other value", () => {
    const stack = new Stack<number | string | boolean | null>();
    stack.push(0);
    stack.push("");
    stack.push(false);
    stack.push(null);
    expect(stack.size).toBe(4);
    expect(stack.pop()).toBeNull();
    expect(stack.pop()).toBe(false);
    expect(stack.pop()).toBe("");
    expect(stack.peek()).toBe(0);
    expect(stack.isEmpty()).toBe(false);
  });

  it("handles many values", () => {
    const stack = new Stack<number>();
    const count = 100_000;
    for (let i = 0; i < count; i++) {
      stack.push(i);
    }
    expect(stack.size).toBe(count);
    const popped: (number | undefined)[] = [];
    while (!stack.isEmpty()) {
      popped.push(stack.pop());
    }
    expect(popped).toEqual(
      Array.from({ length: count }, (_, i) => count - 1 - i),
    );
  });
});
