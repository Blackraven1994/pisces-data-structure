/**
 * 二叉搜索树
 */

import type { IBinarySearchTreeNode, IBinarySearchTree } from "../../../types";

import { SinglyQueue } from "../../index";

class BinarySearchTreeNode<T = any> implements IBinarySearchTreeNode<T> {
    value: T;
    left: IBinarySearchTreeNode<T> | null = null;
    right: IBinarySearchTreeNode<T> | null = null;

    parent: IBinarySearchTreeNode<T> | null = null;

    get isLeftChild(): boolean {
        return !!(this.parent && this.parent.left === this);
    }

    get isRightChild(): boolean {
        return !!(this.parent && this.parent.right === this);
    }

    constructor(value: T) {
        this.value = value;
    }
}

class BinarySearchTree<T = any> implements IBinarySearchTree<T> {
    protected root: IBinarySearchTreeNode<T> | null = null;

    private insertNode(currentNode: IBinarySearchTreeNode<T>, newNode: IBinarySearchTreeNode<T>) {
        if (newNode.value < currentNode.value) {
            if (currentNode.left) {
                this.insertNode(currentNode.left, newNode);
            } else {
                currentNode.left = newNode;

                newNode.parent = currentNode;
            }
        } else {
            if (currentNode.right) {
                this.insertNode(currentNode.right, newNode);
            } else {
                currentNode.right = newNode;

                newNode.parent = currentNode;
            }
        }
    }

    private locateTargetNode(targetValue: T): IBinarySearchTreeNode<T> | null {
        let _current = this.root;
        let _parent: IBinarySearchTreeNode<T> | null = null;

        while (_current) {
            if (_current.value === targetValue) return _current;

            _parent = _current;

            if (_current.value < targetValue) {
                _current = _current.right;
            } else {
                _current = _current.left;
            }

            if (_current) {
                _current.parent = _parent;
            }
        }

        return null;
    }

    private findSuccessorTreeNode(delNode: IBinarySearchTreeNode<T>): IBinarySearchTreeNode<T> {
        let _current = delNode.right;
        let _successor: IBinarySearchTreeNode<T> | null = null;

        while (_current) {
            _successor = _current;
            _current = _current.left;

            if (_current) _current.parent = _successor;
        }

        if (_successor !== delNode.right) {
            _successor!.parent!.left = _successor!.right;

            if (_successor?.right) {
                _successor.right.parent = _successor.parent;
            }
        } else {
            delNode.right = _successor!.right;

            if (_successor!.right) {
                _successor!.right.parent = delNode;
            }
        }

        return _successor!;
    }

    protected createTreeNode(value: T): BinarySearchTreeNode<T> {
        return new BinarySearchTreeNode(value);
    }

    protected checkBalance(treeNode: BinarySearchTreeNode<T>, actionType = 'insert') { }

    insert(value: T) {
        const newBSTNode = this.createTreeNode(value);

        if (!this.root) {
            this.root = newBSTNode;
        } else {
            this.insertNode(this.root, newBSTNode);
        }

        this.checkBalance(newBSTNode);
    }

    preOrderTraverse(callbackFn?: (treeNodeValue: IBinarySearchTreeNode<T>) => void) {
        const _treeNodeStack: IBinarySearchTreeNode<T>[] = [];
        let _current: IBinarySearchTreeNode<T> | null = this.root;

        while (_current !== null || _treeNodeStack.length !== 0) {
            while (_current !== null) {
                callbackFn && callbackFn(_current);

                _treeNodeStack.push(_current);

                _current = _current.left;
            }

            _current = _treeNodeStack.pop()!;

            _current = _current.right;
        }
    }

    inOrderTraverse(callbackFn?: (treeNodeValue: IBinarySearchTreeNode<T>) => void) {
        const _treeNodeStack: IBinarySearchTreeNode<T>[] = [];
        let _current: IBinarySearchTreeNode<T> | null = this.root;

        while (_current !== null || _treeNodeStack.length !== 0) {
            while (_current !== null) {
                _treeNodeStack.push(_current);

                _current = _current.left;
            }

            _current = _treeNodeStack.pop()!;

            callbackFn && callbackFn(_current);

            _current = _current.right;
        }
    }

    postOrderTraverse(callbackFn?: (treeNodeValue: IBinarySearchTreeNode<T>) => void) {
        const _treeNodeStack: IBinarySearchTreeNode<T>[] = [];
        let _current: IBinarySearchTreeNode<T> | null = this.root;
        let _lastVisitedTreeNode: IBinarySearchTreeNode<T> | null = null;

        while (_current !== null || _treeNodeStack.length !== 0) {
            while (_current !== null) {
                _treeNodeStack.push(_current);

                _current = _current.left;
            }

            _current = _treeNodeStack[_treeNodeStack.length - 1];

            if (_current.right === null || _current.right === _lastVisitedTreeNode) {
                callbackFn && callbackFn(_current);

                _lastVisitedTreeNode = _current;

                _treeNodeStack.pop();

                _current = null;
            } else {
                _current = _current.right;
            }
        }
    }

    levelOrderTraverse(callbackFn?: (treeNodeValue: IBinarySearchTreeNode<T>) => void) {
        if (!this.root) {
            console.info('[levelOrderTraverse] 二叉树结构为空，层序遍历停止');
        } else {
            const _treeNodeQueue = new SinglyQueue<IBinarySearchTreeNode<T>>();

            _treeNodeQueue.enqueue(this.root);

            while (_treeNodeQueue.size !== 0) {
                const _frontTreeNode = _treeNodeQueue.dequeue()!;

                callbackFn && callbackFn(_frontTreeNode);

                _frontTreeNode.left && _treeNodeQueue.enqueue(_frontTreeNode.left);
                _frontTreeNode.right && _treeNodeQueue.enqueue(_frontTreeNode.right);
            }
        }
    }

    findMax(): T | null {
        if (!this.root) {
            console.warn('[findMax] 二叉搜索树为空，不存在最值');

            return null;
        } else {
            let _maxTreeNode = this.root;

            while (_maxTreeNode.right) {
                _maxTreeNode = _maxTreeNode.right;
            }

            return _maxTreeNode.value;
        }
    }

    findMin(): T | null {
        if (!this.root) {
            console.warn('[findMax] 二叉搜索树为空，不存在最值');

            return null;
        } else {
            let _maxTreeNode = this.root;

            while (_maxTreeNode.left) {
                _maxTreeNode = _maxTreeNode.left;
            }

            return _maxTreeNode.value;
        }
    }

    search(value: T): boolean {
        let _current = this.root;

        while (_current) {
            if (_current.value === value) {
                return true;
            } else if (_current.value < value) {
                _current = _current.right;
            } else {
                _current = _current.left;
            }
        }

        return false;
    }

    remove(value: T): boolean {
        const _current = this.locateTargetNode(value);

        if (!_current) return false;

        let _deletedTreeNode: BinarySearchTreeNode<T> = _current;

        let _replaceNode: IBinarySearchTreeNode<T> | null = null;

        if (_current.left === null && _current.right === null) {
            _replaceNode = null;
        } else if (_current.right === null) {
            _replaceNode = _current.left;
        } else if (_current.left === null) {
            _replaceNode = _current.right;
        } else {
            const _successor = this.findSuccessorTreeNode(_current)
            _current.value = _successor.value;

            _deletedTreeNode = _successor;

            _replaceNode = _current;
        }

        if (_current === this.root) {
            this.root = _replaceNode;
        } else if (_current.isLeftChild) {
            _current.parent!.left = _replaceNode;
        } else {
            _current.parent!.right = _replaceNode;
        }

        if (_replaceNode) {
            _replaceNode.parent = _deletedTreeNode.parent;
        }

        this.checkBalance(_deletedTreeNode, 'remove');

        return true;
    }
}

export {
    BinarySearchTreeNode,
    BinarySearchTree,
};
