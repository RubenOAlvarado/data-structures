export class Node<T> {
    public value: any;
    public next: Node<T> | null;
    
    constructor(value: any) {
        this.value = value;
        this.next = null;
    }
}