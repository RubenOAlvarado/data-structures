import { Node } from "./Node";

export class LinkedList<T>{
    head: Node<T> | null = null;
    tail: Node<T> | null = null;
    length: number;

    constructor(value: T) {
        this.head = new Node(value);
        this.tail = this.head;
        this.length = 1;
    }

    push(value: T): void {
        // Create a new node with the given value
        // and add it to the end of the list
        const newNode = new Node(value);
        
        if(!this.head && !this.tail) {
            // If the list is empty, set both head and tail to the new node
            this.head = newNode;
            this.tail = newNode;
            this.length = 1;
            return;
        }

        // Link the new node to the current tail
        if (this.tail) {
            this.tail.next = newNode;
        }
        // Update the tail pointer to the new node
        this.tail = newNode;
        // Increment the length of the list
        this.length++;
    }

    pop(): T | null {
        // Remove the last node from the list and return its value
        if (this.length === 0) {
            return null; // List is empty
        }

        if (this.length === 1) {
            const value = this.head!.value;
            this.head = null;
            this.tail = null;
            this.length = 0;
            return value; // Return the only element in the list
        }

        let currentNode = this.head;
        while (currentNode && currentNode.next && currentNode.next.next) {
            currentNode = currentNode.next; // Traverse to the second last node
        }

        if (currentNode && currentNode.next) {
            const value = currentNode.next.value; // Get the value of the last node
            currentNode.next = null; // Remove the last node
            this.tail = currentNode; // Update tail to the second last node
            this.length--; // Decrement length
            return value; // Return the value of the removed node
        }

        return null; // Fallback in case of unexpected nulls
    }
}