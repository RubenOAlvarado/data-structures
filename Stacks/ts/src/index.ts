import { Stack } from "./Stack";

function main(){
    console.log("Hello, Stacks!");
    console.log("This is a TypeScript project for Stacks.");
    console.log("Let's create our first stack!");
    const myStack = new Stack(10);
    console.log("Initial stack size:", myStack.size);
    myStack.push(20);
    console.log("Stack size after pushing 20:", myStack.size);
    myStack.push(30);
    console.log("Stack size after pushing 30:", myStack.size);
    console.log("Popped value:", myStack.pop());
    console.log("Stack size after popping:", myStack.size);
    console.log("Minimum value in stack:", myStack.min());
    console.log("Maximum value in stack:", myStack.max());
}

main();