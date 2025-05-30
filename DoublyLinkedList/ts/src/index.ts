import { DoublyLinkedList } from "./DoublyLinkedList";

function main() {
    console.log("Doubly Linked List in TypeScript");
    console.log("This is a simple implementation of a doubly linked list in TypeScript.");
    const doublyLinkedList = new DoublyLinkedList(1);
    console.log("Initial value:", doublyLinkedList.value);
    doublyLinkedList.push(2);
    console.log("After pushing 2, tail value:", doublyLinkedList.tail);
}

main();