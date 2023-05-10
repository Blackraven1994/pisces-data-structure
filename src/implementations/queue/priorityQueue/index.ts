/**
 * 优先级队列
 */

import type { IPriorityNode, IPriorityQueue } from "../../../types";

import { Heap } from "../../index";

class PriorityNode<T = any> implements IPriorityNode<T> {
    constructor(public value: T, public priority = 0) { }

    valueOf(): number {
        return this.priority;
    }
};

class PriorityQueue<T = any> implements IPriorityQueue<T> {
    private heap: Heap<PriorityNode<T>> = new Heap();

    enqueue(element: T, priority: number) {
        const _newNode = new PriorityNode<T>(element, priority);

        this.heap.insert(_newNode);
    }

    dequeue(): T | undefined {
        return this.heap.extract()?.value;
    }

    peek(): T | undefined {
        return this.heap.peek()?.value;
    }

    isEmpty(): boolean {
        return this.heap.isEmpty();
    }

    get size(): number {
        return this.heap.size;
    }
};

export {
    PriorityNode,
    PriorityQueue,
};
