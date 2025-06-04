import { Stack } from "./Stack";

function main(){
    console.log("Hello, Stacks!");
    console.log("This is a TypeScript project for Stacks.");
    console.log("Let's create our first stack!");
    const myStack = new Stack(10);
    console.log("Initial stack size:", myStack.size);
    myStack.push(20);
    console.log("Stack size after pushing 20:", myStack.size);
}

main();