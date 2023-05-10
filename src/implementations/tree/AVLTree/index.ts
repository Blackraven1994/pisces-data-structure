/**
 * AVL树
 */

import type { IAVLTreeNode, IAVLTree } from "../../../types";

import { BinarySearchTreeNode, BinarySearchTree } from "../index";

// AVL树节点类
class AVLTreeNode<T = any> extends BinarySearchTreeNode<T> implements IAVLTreeNode<T> {
    left: AVLTreeNode<T> | null = null;
    right: AVLTreeNode<T> | null = null;
    parent: AVLTreeNode<T> | null = null;

    private getHeight(): number {
        const _leftChildHeight = this.left ? this.left.getHeight() : 0;

        const _rightChildHeight = this.right ? this.right.getHeight() : 0;

        return Math.max(_leftChildHeight, _rightChildHeight) + 1;
    }

    public getBalanceFactor(): number {
        const _leftChildHeight = this.left ? this.left.getHeight() : 0;

        const _rightChildHeight = this.right ? this.right.getHeight() : 0;

        return _leftChildHeight - _rightChildHeight;
    }

    public get isBalanced(): boolean {
        const _balanceFactor = this.getBalanceFactor();

        return _balanceFactor >= -1 && _balanceFactor <= 1;
    }

    get higherChildNode(): AVLTreeNode<T> | null {
        const _leftChildHeight = this.left ? this.left.getHeight() : 0;

        const _rightChildHeight = this.right ? this.right.getHeight() : 0;

        if (_leftChildHeight > _rightChildHeight) {
            return this.left;
        } else if (_rightChildHeight > _leftChildHeight) {
            return this.right;
        } else {
            return this.isLeftChild ? this.left : this.right;
        }
    }

    public rotateRight() {
        const _pivot = this.left!;
        const _isLeftChild = this.isLeftChild;
        const _isRightChild = this.isRightChild;

        _pivot.parent = this.parent;

        this.left = _pivot.right;

        if (_pivot.right) {
            _pivot.right.parent = this;
        }

        _pivot.right = this;

        this.parent = _pivot;

        if (_pivot.parent) {
            if (_isLeftChild) {
                _pivot.parent.left = _pivot;
            } else if (_isRightChild) {
                _pivot.parent.right = _pivot;
            }
        }

        return _pivot;
    }

    rotateLeft() {
        const _pivot = this.right!;

        const _isLeftChild = this.isLeftChild;
        const _isRightChild = this.isRightChild;

        _pivot.parent = this.parent;

        this.right = _pivot.left;

        if (_pivot.left) {
            _pivot.left.parent = this;
        }

        _pivot.left = this;

        this.parent = _pivot;

        if (_pivot.parent) {
            if (_isLeftChild) {
                _pivot.parent.left = _pivot;
            } else if (_isRightChild) {
                _pivot.parent.right = _pivot;
            }
        }

        return _pivot;
    }
}

// AVL数类
class AVLTree<T = any> extends BinarySearchTree<T> implements IAVLTree<T> {
    protected root: AVLTreeNode<T> | null = null;

    private rebalance(grandParent: AVLTreeNode<T>) {
        const _parent = grandParent.higherChildNode!;

        const _current = _parent.higherChildNode!;

        let _resultNode: AVLTreeNode<T> | null = null;

        if (_parent.isLeftChild) {
            if (_current.isLeftChild) {
                _resultNode = grandParent.rotateRight();
            } else {
                _parent.rotateLeft();
                _resultNode = grandParent.rotateRight();
            }
        } else {
            if (_current.isLeftChild) { // RL情况
                _parent.rotateRight();
                _resultNode = grandParent.rotateLeft();
            } else {
                _resultNode = grandParent.rotateLeft();
            }
        }

        if (!_resultNode.parent) {
            this.root = _resultNode;
        }
    }

    protected createTreeNode(value: T): BinarySearchTreeNode<T> {
        return new AVLTreeNode(value);
    }

    protected checkBalance(treeNode: AVLTreeNode<T>, actionType = 'insert'): void {
        let _current = treeNode.parent;

        while (_current) {
            if (!_current.isBalanced) {
                this.rebalance(_current);

                if (actionType === 'insert') break;
            }

            _current = _current.parent;
        }
    }
}

export {
    AVLTreeNode,
    AVLTree,
};
