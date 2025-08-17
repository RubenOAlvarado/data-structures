export class HashTable<K, V> {
    private table: Array<Array<[K, V]>>;

    constructor(private size: number) {
        this.table = new Array(size).fill(null).map(() => []);
    }

    private hash(key: K): number {
        let hash = 5381;
        const strKey = String(key);

        for (let i = 0; i < strKey.length; i++) {
            const char = strKey.charCodeAt(i);
            hash = (hash * 33) + char;
        }

        return Math.abs(hash) % this.size;
    }

    set(key: K, value: V): void {
        const index = this.hash(key);
        const bucket = this.table[index];

        const existing = bucket.find(([k]) => k === key);
        if (existing) {
            existing[1] = value;
        } else {
            bucket.push([key, value])
        }
    }

    get(key: K): V | undefined {
        const index = this.hash(key);
        const bucket = this.table[index];

        const entry = bucket.find(([k]) => k === key);
        return entry ? entry[1] : undefined;
    }

    has(key: K): boolean {
        const index = this.hash(key);
        const bucket = this.table[index];

        return bucket.some(([k]) => k === key);
    }

    remove(key: K): boolean {
        const index = this.hash(key);
        const bucket = this.table[index];

        const entryIndex = bucket.findIndex(([k]) => k === key);
        if (entryIndex !== -1) {
            bucket.splice(entryIndex, 1);
            return true;
        }
        return false;
    }
}
