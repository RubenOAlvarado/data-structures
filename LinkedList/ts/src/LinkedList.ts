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

    unshift(value: T): void {
        // Add a new node at the beginning of the list
        const newNode = new Node(value);
        
        if (!this.head && !this.tail) {
            // If the list is empty, set both head and tail to the new node
            this.head = newNode;
            this.tail = newNode;
            this.length = 1;
            return;
        }

        // Link the new node to the current head
        newNode.next = this.head;
        // Update head to the new node
        this.head = newNode;
        // Increment the length of the list
        this.length++;
    }

    shift(): T | null {
        // Remove the first node from the list and return its value
        if (this.length === 0) {
            return null; // List is empty
        }

        const value = this.head!.value; // Get the value of the first node
        this.head = this.head!.next; // Move head to the next node
        this.length--; // Decrement length

        if (this.length === 0) {
            this.tail = null; // If the list is now empty, set tail to null
        }

        return value; // Return the value of the removed node
    }

    getFirstNode(): Node<T> | null {
        // Return the first node of the list
        return this.head;
    }

    getLastNode(): Node<T> | null {
        // Return the last node of the list
        if(!this.head){
            return null; // If the list is empty, return null
        }
        let temp = this.head;
        while (temp && temp.next) {
            temp = temp.next; // Traverse to the last node
        }
        return temp; // Return the last node
    }

    get(index: number): T | null {
        // Get the value at a specific index in the list
        if (index < 0 || index >= this.length) {
            return null; // Index out of bounds
        }

        let currentNode = this.head;
        for (let i = 0; i < index; i++) {
            if (currentNode) {
                currentNode = currentNode.next; // Traverse to the node at the index
            }
        }

        return currentNode ? currentNode.value : null; // Return the value or null if not found
    }
}