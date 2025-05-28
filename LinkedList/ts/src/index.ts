import { LinkedList } from "./LinkedList";

function main(){
    console.log("Linked List in TypeScript");
    console.log("This is a simple implementation of a singly linked list in TypeScript.");
    console.log("You can create a linked list, add elements to it, and remove elements from it.");
    const myLinkedList = new LinkedList<number>(10);
    myLinkedList.push(20);
    myLinkedList.push(30);
    myLinkedList.push(40);
    myLinkedList.push(60);
    myLinkedList.push(70);
    myLinkedList.push(80);
    myLinkedList.push(90);
    console.log("Initial Linked List: ");
    console.log(myLinkedList);
    console.log("Length of Linked List: ", myLinkedList.length);
    console.log("Popping last element: ", myLinkedList.pop());
    console.log(`Unshift new element: 50`);
    myLinkedList.unshift(50);
    console.log("Linked List after unshifting: ");
    console.log(myLinkedList);
    console.log("Length of Linked List after unshifting: ", myLinkedList.length);
    console.log("Shifting first element: ", myLinkedList.shift());
    console.log("Linked List after shifting: ");
    console.log(myLinkedList);
    console.log(`Linked list head: ${myLinkedList.getFirstNode()?.value}`);
    console.log(`Linked list tail: ${myLinkedList.getLastNode()?.value}`);
    console.log("Getting index 2 element: ", myLinkedList.get(2));
    console.log("Getting index 5 element: ", myLinkedList.get(5));
}

main();