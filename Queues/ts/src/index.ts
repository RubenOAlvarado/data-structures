import { Queue } from "./Queue";

function main() {
  console.log("Hello, Queue!");
  console.log("This is a simple TypeScript implementation of a Queue.");
  console.log("You can enqueue and dequeue items, and check the size of the queue.");
  let queue = new Queue<number>(1);
  console.log("Initial queue size:", queue.size);
  queue.enqueue(2);
  console.log("Queue after enqueueing 2:", queue);
  queue.enqueue(3);
  console.log("Queue after enqueueing 3:", queue);
  console.log("Dequeueing item:", queue.dequeue());
  console.log("Queue after dequeueing:", queue);
}

main();