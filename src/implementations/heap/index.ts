/**
 * 堆结构（二叉堆）
 */

import { THeapType, IHeap } from "../../types";

class Heap<T = any> implements IHeap<T> {
    private data: T[] = [];
    private length = 0;
    private type: THeapType = 'max';

    private swapElement(i: number, j: number) {
        [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
    }

    private compareNode(i: number, j: number) {
        if (this.type === 'max') {
            return this.data[i] >= this.data[j];
        } else {
            return this.data[i] <= this.data[j];
        }
    }

    private percolateUp() {
        let _currentIndex = this.length - 1;

        while (_currentIndex > 0) {
            let _parentIndex = Math.floor((_currentIndex - 1) / 2);

            if (this.compareNode(_parentIndex, _currentIndex)) {
                break;
            }

            this.swapElement(_currentIndex, _parentIndex);
            _currentIndex = _parentIndex;
        }
    }

    private percolateDown(startIndex = 0) {
        let _currentIndex = startIndex;

        while ((_currentIndex * 2 + 1) < this.length) {
            const _leftChildIndex = _currentIndex * 2 + 1;
            const _rightChildIndex = _currentIndex * 2 + 2;
            let _targetChildIndex = _leftChildIndex;

            if (_rightChildIndex < this.length && this.compareNode(_rightChildIndex, _leftChildIndex)) {
                _targetChildIndex = _rightChildIndex;
            }

            if (this.compareNode(_currentIndex, _targetChildIndex)) {
                break;
            }

            this.swapElement(_currentIndex, _targetChildIndex);

            _currentIndex = _targetChildIndex;
        }
    }

    constructor(originalArr: T[] = [], type?: THeapType) {
        if (type) this.type = type;

        if (originalArr.length > 0) this.buildHeap(originalArr);
    }

    public insert(element: T) {
        this.data.push(element);

        this.length++;

        this.percolateUp();
    }

    public extract(): T | undefined {
        if (this.length === 0) {
            return undefined;
        } else if (this.length === 1) {
            this.length--;

            return this.data.pop()!;
        } else {
            const _topValue = this.data[0];

            this.data[0] = this.data.pop()!;

            this.length--;

            this.percolateDown();

            return _topValue;
        }
    }

    public peek(): T | undefined {
        return this.data[0];
    }

    public isEmpty(): boolean {
        return this.length === 0;
    }

    public get size() {
        return this.length;
    }

    public buildHeap(list: T[]) {
        this.data = list;
        this.length = list.length;

        const _startIndex = Math.floor(this.length / 2 - 1);

        for (let _index = _startIndex; _index >= 0; _index--) {
            this.percolateDown(_index);
        }
    }
}

export {
    Heap,
};
