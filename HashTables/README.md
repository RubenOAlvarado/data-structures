# Hash Tables

Hash tables are a data structure that implements an associative array abstract data type, a structure that can map keys to values. A hash table uses a hash function to compute an index into an array of buckets or slots, from which the desired value can be found.
Hash tables are used to implement associative arrays, sets, and other data structures that require fast access to elements based on keys.

## Implementation
- [Typescript](./ts)

## Usage
Hash tables can be used in various applications, such as:
- Implementing dictionaries or maps where you need to associate keys with values
- Caching data for quick retrieval
- Implementing sets where you need to check for membership quickly
- Storing and retrieving data in databases

### Hash functions
A hash function is a function that takes an input (or 'key') and returns a fixed-size string of bytes. The output is typically a 'digest' that uniquely represents the input data. Hash functions are used in hash tables to compute the index for storing and retrieving values.
A good hash function minimizes the number of collisions (when two keys hash to the same index) and distributes keys uniformly across the hash table.