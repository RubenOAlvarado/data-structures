import { Node } from "./Node";

export class Stack<T> {
    first: Node<T> | null;
    size: number;

    constructor(value: T){
        const newNode = new Node(value);
        this.first = newNode;
        this.size = 1;
    }

    push(value: T): void {
        // If the stack is empty, create a new node and set it as the first node
        // Otherwise, create a new node and set it as the first node, linking it to the previous first node
        if(this.first === null) {
            this.first = new Node(value);
            this.size = 1;
            return;
        }
        const newNode = new Node(value);
        // Link the new node to the current first node
        newNode.next = this.first;
        // Update the first node to be the new node
        this.first = newNode;
        // Increment the size of the stack
        this.size++;
    }

    pop(): T | null {
        if(this.first === null) {
            return null; // Stack is empty
        }
        const poppedNode = this.first;
        // Update the first node to be the next node
        this.first = this.first.next;
        // Decrement the size of the stack
        this.size--;
        // Return the value of the popped node
        return poppedNode.value;
    }
}