# Doubly Linked Lists

A doubly linked list is a type of linked list where each node contains a reference to both the next and the previous node in the sequence. This allows for traversal in both directions, making it more flexible than a singly linked list.
A doubly linked list consists of nodes, where each node contains three components:

- **Data**: The value stored in the node.
- **Next**: A reference to the next node in the list.
- **Previous**: A reference to the previous node in the list.

The first node in a doubly linked list is called the `Head`, and the last node is called the `Tail`. The `Head`'s `Previous` reference is `null`, and the `Tail`'s `Next` reference is `null`.
A doubly linked list allows for efficient insertion and deletion of nodes, as well as bidirectional traversal. It is particularly useful in scenarios where frequent insertions and deletions are required, such as in implementing deques or certain types of caches.

## Implementation
- [Typescript](./ts)
- [Java](./java) (soon)
- [Go](./go) (soon)

## Usage
Doubly linked lists can be used in various applications, such as:
- Implementing deques (double-ended queues)
- Implementing certain types of caches
- Navigating through a sequence of elements in both directions
- Implementing undo/redo functionality in applications
- Implementing complex data structures like adjacency lists for graphs