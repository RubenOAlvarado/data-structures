import { HashTable } from "./hash-table";

function main(){
    console.log("Hash Tables in TypeScript");
    console.log("This is a simple implementation of a hash table in TypeScript.");
    console.log("You can use this to store key-value pairs efficiently.");
    const myTable = new HashTable<string, number>(10);
    myTable.set("apple", 1);
    myTable.set("banana", 2);
    myTable.set("orange", 3);
    console.log("Value for 'apple':", myTable.get("apple")); // Output: 1
    console.log("Value for 'banana':", myTable.get("banana")); // Output: 2
    console.log("Value for 'orange':", myTable.get("orange")); // Output: 3
    console.log("All keys in the hash table:", myTable.getAllKeys()); // Output: ['apple', 'banana', 'orange']
    console.log("All values in the hash table:", myTable.getAllValues()); // Output: [1, 2, 3]
}

main();