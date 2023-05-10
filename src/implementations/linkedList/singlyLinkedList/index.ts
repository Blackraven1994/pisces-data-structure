/**
 * 单向链表
 */

import type { INode, ILinkedList } from "../../../types";

class SinglyLinkedNode<T = any> implements INode<T> {
    public value: T;
    public next: SinglyLinkedNode<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}

class SinglyLinkedList<T = any> implements ILinkedList<T> {
    protected head: SinglyLinkedNode<T> | null = null;
    protected tail: SinglyLinkedNode<T> | null = null;
    public size: number = 0;

    protected getTargetNode(position: number): SinglyLinkedNode<T> | null {
        let _index = 0;
        let _targetNode = this.head;

        while (_index++ < position && _targetNode) {
            _index++;
            _targetNode = _targetNode.next;
        }

        return _targetNode;
    }

    private isTailNode(current: SinglyLinkedNode<T>): boolean {
        return current.next === null || current.next === this.head;
    }

    append(element: T) {
        const _newNode = new SinglyLinkedNode<T>(element);

        if (!this.head) {
            this.head = _newNode;
        } else {
            this.tail!.next = _newNode; // 把 `tail` 属性的 `next` 指向创建的链结点
        }

        this.tail = _newNode;

        this.size++;
    }

    insert(element: T, position: number): boolean {
        if (position < 0 || position > this.size) {
            console.error(`[insert] 参数 position ${position} 越界，向链表插入元素失败`);
            return false;
        }

        const newNode = new SinglyLinkedNode<T>(element);

        if (position === 0) {
            newNode.next = this.head;

            this.head = newNode;
        } else {
            const _previous = this.getTargetNode(position - 1);

            newNode.next = _previous!.next;
            _previous!.next = newNode;
        }

        if (position === this.size) {
            this.tail = newNode;
        }

        this.size++;

        return true;
    }

    get(position: number): T | null {
        if (position < 0 || position >= this.size) {
            console.error(`[get] 参数 position ${position} 越界，从链表移除元素失败`);
            return null;
        }

        const _current = this.getTargetNode(position);

        return _current?.value ?? null;
    }

    indexOf(element: T): number {
        let _index = 0;
        let _current = this.head;

        while (_current) {
            if (_current.value === element) {
                return _index;
            }

            if (_current && this.isTailNode(_current)) {
                _current = null;
            } else {
                _index++;
                _current = _current.next;
            }
        }

        return -1;
    }

    update(position: number, element: T): boolean {
        if (position < 0 || position >= this.size) {
            console.error(`[update] 参数 position ${position} 越界，更新链表元素失败`);
            return false;
        }

        const _current = this.getTargetNode(position);

        _current!.value = element;

        return true;
    }

    removeAt(position: number): T | null {
        if (position < 0 || position >= this.size) {
            console.error(`[removeAt] 参数 position ${position} 越界，从链表移除元素失败`);
            return null;
        }

        let _current = this.head;

        if (position === 0) {
            this.head = _current?.next ?? null;

            if (this.size === 1) {
                this.tail = null;
            }
        } else {
            const _previous = this.getTargetNode(position - 1);
            _current = _previous!.next;
            _previous!.next = _previous?.next?.next ?? null;

            if (position === this.size - 1) {
                this.tail = _previous;
            }
        }

        this.size--;

        return _current?.value ?? null;
    }

    public remove(element: T): boolean {
        const _index = this.indexOf(element);
        return !!this.removeAt(_index);
    }

    public isEmpty() {
        return this.size === 0;
    }

    public get length() {
        return this.size;
    }

    public traverse() {
        let _current = this.head;
        let _index = 1;

        while (_current) {
            console.info(`[traverse] 第${_index}个链表元素：`, _current);

            if (_current && this.isTailNode(_current)) {
                _current = null;
            } else {
                _current = _current.next;
                _index++;
            }
        }
    }
}

export {
    SinglyLinkedNode,
    SinglyLinkedList,
};
