/**
 * 双端链表
 */

import type { IDoublyLinkedNode, IDoublyLinkedList } from "../../../types";

import { SinglyLinkedNode, SinglyLinkedList } from "../singlyLinkedList";

class DoublyLinkedNode<T = any> extends SinglyLinkedNode<T> implements IDoublyLinkedNode<T> {
    public next: DoublyLinkedNode<T> | null = null;
    public prev: DoublyLinkedNode<T> | null = null;
}

class DoublyLinkedList<T> extends SinglyLinkedList<T> implements IDoublyLinkedList<T> {
    protected head: DoublyLinkedNode<T> | null = null;
    protected tail: DoublyLinkedNode<T> | null = null;

    insert(element: T, position: number): boolean {
        if (position < 0 || position > this.size) {
            console.error(`[insert] 参数 position ${position} 越界，向链表插入元素失败`);
            return false;
        }

        if (position === 0) {
            this.prepend(element);
        } else if (position === this.size) {
            this.append(element);
        } else {
            const _newNode = new DoublyLinkedNode<T>(element);

            const _current = this.getTargetNode(position)! as DoublyLinkedNode<T>;

            _current.prev!.next = _newNode;

            _newNode.prev = _current.prev;

            _current.prev = _newNode;

            _newNode.next = _current;

            this.size++;
        }

        return true;
    }

    append(element: T): void {
        const _newNode = new DoublyLinkedNode<T>(element);

        if (this.size === 0) {
            this.head = _newNode;
            this.tail = _newNode;
        } else {
            this.tail!.next = _newNode;

            _newNode.prev = this.tail;

            this.tail = _newNode;
        }

        this.size++;
    }

    prepend(element: T) {
        const _newNode = new DoublyLinkedNode<T>(element);

        if (this.size === 0) {
            this.head = _newNode;
            this.tail = _newNode;
        } else {
            this.head!.prev = _newNode;

            _newNode.next = this.head;

            this.head = _newNode;
        }

        this.size++;
    }

    postTraverse() {
        let _current = this.tail;
        let _index = this.size;

        while (_current) {
            console.info(`[postTraverse] 第${_index}个链表元素：`, _current);

            _current = _current.prev;

            _index--;
        }
    }

    removeAt(position: number): T | null {
        if (position < 0 || position >= this.size) {
            console.error(`[removeAt] 参数 position ${position} 越界，从链表移除元素失败`);
            return null;
        }

        let _current = this.head;

        if (position === 0) {
            if (this.size === 1) {
                this.head = null;
                this.tail = null;
            } else {
                this.head = this.head!.next;

                this.head!.prev = null;
            }
        } else if (position === this.size - 1) {
            _current = this.tail;

            this.tail = this.tail!.prev;

            this.tail!.next = null;
        } else {
            _current = this.getTargetNode(position)! as DoublyLinkedNode<T>;

            _current.next!.prev = _current.prev;

            _current.prev!.next = _current.next;
        }

        this.size--;

        return _current?.value ?? null;
    }

    public remove(element: T): boolean {
        const _index = super.indexOf(element);

        return !!this.removeAt(_index);
    }
}

export {
    DoublyLinkedNode,
    DoublyLinkedList,
};
