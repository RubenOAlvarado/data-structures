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
        if(!this.first) {
            this.first = new Node(value);
            this.last = this.first;
        }
        
        const newNode = new Node(value);
        if(this.last) {
            this.last.next = newNode;
            this.last = newNode;
        }
        this.size++;
    }

    dequeue(): T | null {
        if(!this.first) {
            return null;
        }
        
        const value = this.first.value;
        this.first = this.first.next;
        this.size--;
        
        if(this.size === 0) {
            this.last = null;
        }
        
        return value;
    }
}