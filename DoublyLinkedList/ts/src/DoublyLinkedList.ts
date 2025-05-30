import { Node } from "./Node";

export class DoublyLinkedList<T> {
  value: Node<T> | null = null;
  head: Node<T> | null = null;
  tail: Node<T> | null = null;
  length: number;

  constructor(value: T) {
    this.value = new Node(value);
    this.head = this.value;
    this.tail = this.head;
    this.length = 1;

  }

  push(value: T): void {
    const newNode = new Node(value);
    
    // If the list is empty, set both head and tail to the new node
    if (!this.head && !this.tail) {
      this.head = newNode;
      this.tail = newNode;
      this.length = 1;
      return;
    }

    // Link the new node to the current tail
    if (this.tail) {
      this.tail.next = newNode;
      newNode.prev = this.tail; // Link the new node back to the current tail
    }

    // Update the tail pointer to the new node
    this.tail = newNode;
    // Increment the length of the list
    this.length++;

  }
}