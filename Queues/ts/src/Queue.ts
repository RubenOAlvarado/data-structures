import { Node } from "./Node";

export class Queue<T> {
    first: Node<T> | null;
    last: Node<T> | null;
    size: number;

    constructor(value: T) {
        this.first = new Node(value);
        this.last = this.first;
        this.size = 1;
    }

    enqueue(value: T): void {
        const newNode = new Node(value);
        if(this.last !== null) this.last.next = newNode;
        this.last = newNode;
        if(this.first === null) this.first = this.last;
        this.size++;
    }

    dequeue(): T | null {
        if(this.first === null) return null;
        const nodeToDequeue = this.first;
        this.first = this.first.next;
        if(this.first === null) this.last = null;
        this.size--;
        return nodeToDequeue.value;
    }

    peek(): T | null {
        return this.first ? this.first.value : null;
    }

    isEmpty(): boolean {
        return this.size === 0;
    }
}
