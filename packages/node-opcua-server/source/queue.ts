// tslint:disable-next-line:no-var-requires
const Dequeue = require("dequeue");
export class Queue<T> {
    private _d = new Dequeue();
    size: number;
    constructor() {
        this.size = 0;
    }
    clear(): void {
        this.size = 0;
    }

    public shift(): T | undefined {
        if (this.size === 0) {
            return undefined;
        }
        this.size -= 1;
        return this._d.shift() as T;
    }

    public push(value: T): void {
        this.size += 1;
        this._d.push(value);
    }

    public values(): Iterable<T> {
        const self = this;
        const iteratable = {
            [Symbol.iterator]() {
                let cursor = self._d.head;
                const iterator = {
                    next() {
                        cursor = cursor.next;
                        if (cursor === self._d.head) {
                            return { done: true, value: null };
                        }
                        const ret = {
                            done: false,
                            value: cursor.data as T
                        };
                        return ret;
                    }
                };
                return iterator;
            }
        };
        return iteratable as any;
    }
}
