import { LinkedList } from "./LinkedList";

function main(){
    console.log("Linked List in TypeScript");
    console.log("This is a simple implementation of a singly linked list in TypeScript.");
    console.log("You can create a linked list, add elements to it, and remove elements from it.");
    const myLinkedList = new LinkedList<number>(10);
    myLinkedList.push(20);
    myLinkedList.push(30);
    myLinkedList.push(40);
    console.log("Initial Linked List: ");
    console.log(myLinkedList);
    console.log("Length of Linked List: ", myLinkedList.length);
    console.log("Popping last element: ", myLinkedList.pop());
    console.log("Linked List after popping last element: ");
    console.log(myLinkedList);
    console.log("Length of Linked List after popping: ", myLinkedList.length);
}

main();