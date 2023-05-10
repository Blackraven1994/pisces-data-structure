/**
 * 单端队列
 */

import type { IQueue } from "../../../types";

class SinglyQueue<T = any> implements IQueue<T> {
    protected data: T[] = [];

    enqueue(element: T) {
        this.data.push(element);
    }

    dequeue(): T | undefined {
        return this.data.shift();
    }

    front(): T | undefined {
        return this.data[0];
    }

    peek(): T | undefined {
        return this.data[0];
    }

    isEmpty(): boolean {
        return this.data.length === 0;
    }

    get size(): number {
        return this.data.length;
    }
}

export {
    SinglyQueue,
};
