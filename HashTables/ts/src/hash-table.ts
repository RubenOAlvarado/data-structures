export class HashTable<K, V> {
    private table: Array<Array<[K, V]>>;

    constructor(private size: number) {
        this.table = new Array(size).fill(null).map(() => []);
    }

    private hash(key: K): number {
        let hash = 0; // Initialize hash value
        const strKey = String(key); // Convert key to string for consistent hashing
        // Calculate hash value by summing character codes of the string representation of the key
        for (let i = 0; i < strKey.length; i++) {
            hash += strKey.charCodeAt(i); // Add character code to hash
        }
        return hash % this.size; // Return hash value modulo table size for index
        /**
         * Example:
         * For key 'abc', hash = (97 + 98 + 99) % this.size
         * = 294 % this.size
         * This ensures the hash value fits within the bounds of the table size.
         * This method provides a simple yet effective way to distribute keys across the hash table.
         * * Note: This is a basic hash function and may not be suitable for all key types or distributions.
         * For more complex keys, consider using a more sophisticated hashing algorithm.
         */
    }

    set(key: K, value: V): void {
        const index = this.hash(key); // Get the index for the key
        const bucket = this.table[index]; // Get the bucket at that index

        // Check if the key already exists in the bucket
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value; // Update value if key exists
                return;
            }
        }

        // If key does not exist, add a new entry
        bucket.push([key, value]);
    }

    get(key: K): V | undefined {
        const index = this.hash(key); // Get the index for the key
        const bucket = this.table[index]; // Get the bucket at that index

        // Search for the key in the bucket
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return bucket[i][1]; // Return value if key is found
            }
        }

        return undefined; // Return undefined if key is not found
    }

    getAllKeys(): K[] {
        const keys: K[] = []; // Initialize an array to hold all keys

        // Iterate through each bucket in the hash table
        for (const bucket of this.table) {
            // For each entry in the bucket, push the key to the keys array
            for (const [key, value] of bucket) {
                keys.push(key); // Add the key to the keys array
            }
        }

        return keys; // Return the array of keys
    }

    getAllValues(): V[] {
        const values: V[] = []; // Initialize an array to hold all values

        // Iterate through each bucket in the hash table
        for (const bucket of this.table) {
            // For each entry in the bucket, push the value to the values array
            for (const [key, value] of bucket) {
                values.push(value); // Add the value to the values array
            }
        }

        return values; // Return the array of values
    }
}