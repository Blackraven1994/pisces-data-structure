/**
 * 双端队列（Deque，Double-ended queue）
 */

import type { IDEQueue } from "../../../types";

import { SinglyQueue } from "../index";

class DEQueue<T = any> extends SinglyQueue<T> implements IDEQueue<T> {
    enqueueFront(element: T) {
        this.data.unshift(element);
    }

    dequeueBack(): T | undefined {
        return this.data.pop();
    }
}

export {
    DEQueue,
};
