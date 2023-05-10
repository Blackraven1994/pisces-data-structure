/**
 * 栈结构实现
 */

import type { IStack } from "../../types";

class Stack<T = any> implements IStack<T> {
    private data: T[] = [];

    public push(element: T): void {
        this.data.push(element);
    }

    public pop(): T | undefined {
        return this.data.pop();
    }

    public peek(): T | undefined {
        return this.data[this.data.length - 1];
    }

    public isEmpty() {
        return this.data.length === 0;
    }

    public get size() {
        return this.data.length;
    }
}

export {
    Stack,
};
