import { DoublyLinkedList } from "./DoublyLinkedList";

function main() {
    console.log("Doubly Linked List in TypeScript");
    console.log("This is a simple implementation of a doubly linked list in TypeScript.");
    const doublyLinkedList = new DoublyLinkedList(1);
    console.log("Initial value:", doublyLinkedList.value);
    doublyLinkedList.push(2);
    console.log("After pushing 2, tail value:", doublyLinkedList.tail);
    console.log("Current length of the list:", doublyLinkedList.length);
    const poppedNode = doublyLinkedList.pop();
    console.log("Popped node value:", poppedNode ? poppedNode.value : "null");
    console.log("Current length of the list after pop:", doublyLinkedList.length);
    console.log("Current head value:", doublyLinkedList.head ? doublyLinkedList.head.value : "null");
    console.log("Current tail value:", doublyLinkedList.tail ? doublyLinkedList.tail.value : "null");
    console.log("Unshift 0 to the list");
    doublyLinkedList.unshift(0);
    console.log("Current head value after unshift:", doublyLinkedList.head ? doublyLinkedList.head.value : "null");
    console.log("Current tail value after unshift:", doublyLinkedList.tail ? doublyLinkedList.tail.value : "null");
    console.log("Push some more values to the list");
    doublyLinkedList.push(3);
    doublyLinkedList.push(4);
    console.log("Current length of the list after pushing more values:", doublyLinkedList.length);
    console.log("Current head value after pushing more values:", doublyLinkedList.head ? doublyLinkedList.head.value : "null");
    console.log("Current tail value after pushing more values:", doublyLinkedList.tail ? doublyLinkedList.tail.value : "null");
    console.log("Shift the list");
    const shiftedNode = doublyLinkedList.shift();
    console.log("Shifted node value:", shiftedNode ? shiftedNode.value : "null");
    console.log("Current length of the list after shift:", doublyLinkedList.length);
    console.log("Current head value after shift:", doublyLinkedList.head ? doublyLinkedList.head.value : "null");
    console.log("Current tail value after shift:", doublyLinkedList.tail ? doublyLinkedList.tail.value : "null");
    console.log("Final state of the list:");
    let currentNode = doublyLinkedList.head;
    while (currentNode) {
        console.log("Node value:", currentNode.value);
        currentNode = currentNode.next;
    }
    console.log("End of the list.");
    console.log("Doubly Linked List operations completed successfully.");
    console.log("Reverse the list");
    doublyLinkedList.reverse();
    console.log("List reversed successfully.");
    currentNode = doublyLinkedList.head;
    while (currentNode) {
        console.log("Reversed Node value:", currentNode.value);
        currentNode = currentNode.next;
    }
}

main();