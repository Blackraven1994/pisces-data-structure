/**
 * 单向循环链表
 */

import type { ISinglyCircularLinkedList } from "../../../types";

import { SinglyLinkedList } from "../singlyLinkedList";

class SinglyCircularLinkedList<T = any> extends SinglyLinkedList<T> implements ISinglyCircularLinkedList<T> {
    public append(element: T): void {
        super.append(element);

        this.tail!.next = this.head;
    }

    public insert(element: T, position: number): boolean {
        const _insertResult = super.insert(element, position);

        if (_insertResult && (position === 0 || position === this.size - 1)) {
            this.tail!.next = this.head;
        }

        return _insertResult;
    }

    public removeAt(position: number): T | null {
        const _value = super.removeAt(position);

        if (_value && this.tail && (position === 0 || position === this.size)) {
            this.tail.next = this.head;
        }

        return _value;
    }

    public remove(element: T): boolean {
        const _index = super.indexOf(element);

        return !!this.removeAt(_index);
    }
}

export {
    SinglyCircularLinkedList,
};
