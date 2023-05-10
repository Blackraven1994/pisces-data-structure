/**
 * 哈希表
 */

import type { TTuple, IHashTable } from "../../types";

class HashTable<T = any> implements IHashTable<T> {
    private storage: TTuple<T>[][];
    private count = 0;
    private length = 7;

    private hashFunc(targetKey: string, hashTableLength = this.length) {
        let _hashCode = 0;

        const _targetKeyLength = targetKey.length;
        for (let _index = 0; _index < _targetKeyLength; _index++) {
            _hashCode = _hashCode * 31 + targetKey.charCodeAt(_index);
        }

        const _index = _hashCode % hashTableLength;

        return _index;
    }

    private isPrime(num: number): boolean {
        if (num <= 1) {
            console.error('[isPrime] 质数必须是大于1的自然数');
            return false;
        }

        const _squareRoot = Math.sqrt(num);

        for (let _index = 2; _index < _squareRoot; _index++) {
            if (num % _index === 0) {
                return false;
            }
        }

        return true;
    }

    private resize(newHashTableLength: number) {
        let _newHashTableLength = newHashTableLength;

        if (!this.isPrime(newHashTableLength)) {
            _newHashTableLength++;

            while (!this.isPrime(_newHashTableLength)) {
                _newHashTableLength++;
            }
        }

        if (_newHashTableLength < 7) _newHashTableLength = 7;

        this.length = _newHashTableLength;

        const _originalStorage = this.storage;

        this.count = 0;

        this.storage = new Array(_newHashTableLength).fill(null);

        _originalStorage.forEach((_bucket) => {
            if (_bucket) {
                _bucket.forEach((_tuple) => {
                    this.put(_tuple[0], _tuple[1]);
                });
            }
        });
    }

    constructor(hashTableLength?: number) {
        if (!hashTableLength) hashTableLength = this.length;

        this.storage = new Array(hashTableLength).fill(null);
    }

    public put(key: string, value: T) {
        const _index = this.hashFunc(key);

        let _bucket = this.storage[_index];

        if (!_bucket) {
            _bucket = [];
            this.storage[_index] = _bucket;
        }

        const _targetTuple = _bucket.find((_element) => _element[0] === key);
        if (_targetTuple) {
            _targetTuple[1] = value;
        } else {
            _bucket.push([key, value]);

            this.count++;

            if ((this.count / this.length) > 0.75) {
                this.resize(this.length * 2);
            }
        }
    }

    public get(key: string): T | null {
        const _index = this.hashFunc(key);

        let _bucket = this.storage[_index];

        if (!_bucket) {
            return null;
        }

        const _targetTuple = _bucket.find((_element) => _element[0] === key);
        if (_targetTuple) {
            return _targetTuple[1];
        } else {
            return null;
        }
    }

    delete(key: string): T | null {
        const _index = this.hashFunc(key);

        let _bucket = this.storage[_index];

        if (!_bucket) {
            return null;
        }

        let _value: T | null = null;

        const _bucketLength = _bucket.length;
        for (let _index = 0; _index < _bucketLength; _index++) {
            const _tuple = _bucket[_index];
            const _tupleKey = _tuple[0];

            if (key === _tupleKey) {
                _bucket.splice(_index, 1);

                this.count--;

                _value = _tuple[1];

                if ((this.count / this.length) < 0.25 && this.length > 7) {
                    this.resize(Math.floor(this.length / 2));
                }

                break;
            }
        }

        return _value;
    }
}

export {
    HashTable,
};