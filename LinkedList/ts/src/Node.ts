export class Node<T> {
    constructor(
        public value: T,
        public next: Node<T> | null = null,
    ){}
}