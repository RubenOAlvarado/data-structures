import { CustomArray } from "./custom-array";

function main(){
    console.log("Custom Array Implementation");
    console.log("====================================");
    const numbersArray = new CustomArray<number>();
    console.log("Working with numbers");
    console.log("====================================");
    numbersArray.push(1);
    numbersArray.push(2);
    numbersArray.push(3);
    numbersArray.push(4);
    numbersArray.push(5);

    console.log(numbersArray.get(0)); // 1
    console.log(numbersArray.get(1)); // 2

    numbersArray.pop();
    console.log(numbersArray.get(4)); // undefined

    numbersArray.delete(1);
    console.log(numbersArray.get(1)); // 3

    console.log("====================================");
    console.log("Working with strings");
    console.log("====================================");
    const stringsArray = new CustomArray<string>();
    stringsArray.push("Hello");
    stringsArray.push("World");
    stringsArray.push("!");

    console.log(stringsArray.get(0)); // "Hello"
    console.log(stringsArray.get(1)); // "World"
    stringsArray.pop();
    console.log(stringsArray.get(2)); // undefined
    stringsArray.delete(0);
    console.log(stringsArray.get(0)); // "World"

    console.log("====================================");
    console.log("Working with objects");
    console.log("====================================");
    const mixedArray = new CustomArray<any>();
    mixedArray.push(1);
    mixedArray.push("Hello");
    mixedArray.push(true);
    mixedArray.push({ name: "John" });
    mixedArray.push([1, 2, 3]);
    console.log(mixedArray.get(0)); // 1
    console.log(mixedArray.get(1)); // "Hello"
    mixedArray.pop();
    console.log(mixedArray.get(4)); // undefined
    mixedArray.delete(1);
    console.log(mixedArray.get(1)); // true
    console.log(mixedArray.get(2)); // { name: "John" }
    console.log(mixedArray.get(3)); // undefined
    console.log(mixedArray.get(4)); // undefined
}

main();