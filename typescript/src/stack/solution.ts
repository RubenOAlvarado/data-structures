interface Node<T> {
  value: T;
  next: Node<T> | undefined;
}

export class Stack<T> implements Iterable<T> {
  #top: Node<T> | undefined = undefined;
  #size = 0;

  push(value: T): void {
    this.#top = { value, next: this.#top };
    this.#size++;
  }

  pop(): T | undefined {
    const top = this.#top;
    if (top === undefined) {
      return undefined;
    }
    this.#top = top.next;
    this.#size--;
    return top.value;
  }

  peek(): T | undefined {
    return this.#top?.value;
  }

  get size(): number {
    return this.#size;
  }

  isEmpty(): boolean {
    return this.#size === 0;
  }

  *[Symbol.iterator](): Iterator<T> {
    for (let node = this.#top; node !== undefined; node = node.next) {
      yield node.value;
    }
  }
}
