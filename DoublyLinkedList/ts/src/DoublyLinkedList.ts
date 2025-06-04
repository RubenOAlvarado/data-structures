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

  pop(): Node<T> | null {
    // If the list is empty, return null
    if (!this.tail) {
      return null;
    }

    // Store the current tail node to return it later
    const poppedNode = this.tail;

    // Update the tail pointer to the previous node
    this.tail = this.tail.prev;

    // If the new tail is not null, unlink the next pointer of the new tail
    if (this.tail) {
      this.tail.next = null;
    } else {
      // If the list becomes empty, set head and tail to null
      this.head = null;
    }

    // Decrement the length of the list
    this.length--;

    // Return the popped node
    return poppedNode;
  }

  unshift(value: T): Node<T> | null {
    const newNode = new Node(value);
    // If the list is empty, set both head and tail to the new node
    if (!this.head && !this.tail) {
      this.head = newNode;
      this.tail = newNode;
      this.length = 1;
      return this.head;
    }
    // Link the new node to the current head
    if (this.head) {
      newNode.next = this.head;
      this.head.prev = newNode; // Link the current head back to the new node
    }

    // Update the head pointer to the new node
    this.head = newNode;
    // Increment the length of the list
    this.length++;

    return this.head;
  }

  shift(): Node<T> | null {
    // If the list is empty, return null
    if (!this.head) {
      return null;
    }

    // Store the current head node to return it later
    const shiftedNode = this.head;

    // Update the head pointer to the next node
    this.head = this.head.next;

    // If the new head is not null, unlink the previous pointer of the new head
    if (this.head) {
      this.head.prev = null;
    } else {
      // If the list becomes empty, set head and tail to null
      this.tail = null;
    }

    // Decrement the length of the list
    this.length--;

    // Return the shifted node
    return shiftedNode;
  }

  reverse(): void {
    let current = this.head;
    let temp = null;

    this.tail = this.head; // Update tail to the current head
    while (current) {
      // Swap the next and prev pointers
      temp = current.prev;
      current.prev = current.next;
      current.next = temp;

      // Move to the next node (which is now previous due to the swap)
      current = current.prev;
    }
    // Update head to the last processed node (which is now the new head)
    if (temp) {
      this.head = temp.prev;
    }
  }
}