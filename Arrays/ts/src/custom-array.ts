// This class implements a custom array-like structure
// with methods to get, push, pop, and delete items.
export class CustomArray<T> {
    // The length of the array
    private length: number;
    // The data storage for the array
    // Using an object to store data for O(1) access
    private data: { [key: number]: T };
    
    constructor() {
        this.length = 0;
        this.data = {};
    }
    
    // returns the element at the specified index
    // O(1) time complexity
    get(index: number) {
        return this.data[index];
    }
    
    // adds an element to the end of the array
    // O(1) time complexity
    push(item: any) {
        this.data[this.length] = item;
        this.length++;
        return this.length;
    }
    
    // removes the last element from the array
    // O(1) time complexity
    pop() {
        if (this.length === 0) return undefined;
        const lastItem = this.data[this.length - 1];
        delete this.data[this.length - 1];
        this.length--;
        return lastItem;
    }
    
    // removes an element at the specified index
    // O(n) time complexity
    delete(index: number) {
        const item = this.data[index];
        this.shiftItems(index);
        return item;
    }
    
    // shifts the items in the array to remove the gap
    // created by deleting an item
    private shiftItems(index: number) {
        for (let i = index; i < this.length - 1; i++) {
          this.data[i] = this.data[i + 1];
        }
        delete this.data[this.length - 1];
        this.length--;
    }
}