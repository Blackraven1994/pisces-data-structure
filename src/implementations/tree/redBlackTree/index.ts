/**
 * 红黑树
 */

import { ERedBlackTreeNodeColor } from "../../../types";

class RedBlackTreeNode<T = any> {
    value: T;
    color: ERedBlackTreeNodeColor;
    parent: RedBlackTreeNode<T> | null;
    left: RedBlackTreeNode<T> | null;
    right: RedBlackTreeNode<T> | null;

    constructor(
        value: T,
        color: ERedBlackTreeNodeColor = ERedBlackTreeNodeColor.RED,
        parent: RedBlackTreeNode<T> | null = null,
        left: RedBlackTreeNode<T> | null = null,
        right: RedBlackTreeNode<T> | null = null
    ) {
        this.value = value;
        this.color = color;
        this.parent = parent;
        this.left = left;
        this.right = right;
    }
}

class RedBlackTree<T = any> {
    protected root: RedBlackTreeNode<T> | null = null;

    private searchTargetNode(value: T): RedBlackTreeNode<T> | null {
        let _targetNode = this.root;
        let parent: RedBlackTreeNode<T> | null = null;

        while (_targetNode) {
            if (_targetNode.value === value) {
                _targetNode.parent = parent;

                return _targetNode;
            }

            parent = _targetNode;

            if (value < _targetNode.value) {
                _targetNode = _targetNode.left;
            } else {
                _targetNode = _targetNode.right;
            }
        }

        return null;
    }

    private leftRotate(node: RedBlackTreeNode<T>) {
        let rightChild = node.right!;
        node.right = rightChild.left;

        if (rightChild.left) {
            rightChild.left.parent = node;
        }

        rightChild.parent = node.parent;

        if (!node.parent) {
            this.root = rightChild;
        } else if (node === node.parent.left) {
            node.parent.left = rightChild;
        } else {
            node.parent.right = rightChild;
        }

        rightChild.left = node;
        node.parent = rightChild;
    }

    private rightRotate(node: RedBlackTreeNode<T>) {
        let leftChild = node.left!;
        node.left = leftChild.right;

        if (leftChild.right) {
            leftChild.right.parent = node;
        }

        leftChild.parent = node.parent;

        if (!node.parent) {
            this.root = leftChild;
        } else if (node === node.parent.right) {
            node.parent.right = leftChild;
        } else {
            node.parent.left = leftChild;
        }

        leftChild.right = node;
        node.parent = leftChild;
    }

    private fixInsertion(node: RedBlackTreeNode<T>) {
        while (node.parent && node.parent.color === ERedBlackTreeNodeColor.RED) {
            let grandParent = node.parent.parent!;

            if (node.parent === grandParent.left) {
                let uncle = grandParent.right;

                if (uncle && uncle.color === ERedBlackTreeNodeColor.RED) {
                    node.parent.color = ERedBlackTreeNodeColor.BLACK;
                    uncle.color = ERedBlackTreeNodeColor.BLACK;
                    grandParent.color = ERedBlackTreeNodeColor.RED;
                    node = grandParent;
                } else {
                    if (node === node.parent.right) {
                        node = node.parent;
                        this.leftRotate(node);
                    }

                    node.parent!.color = ERedBlackTreeNodeColor.BLACK;
                    grandParent.color = ERedBlackTreeNodeColor.RED;

                    this.rightRotate(grandParent);
                }
            } else {
                let uncle = grandParent.left;

                if (uncle && uncle.color === ERedBlackTreeNodeColor.RED) {
                    node.parent.color = ERedBlackTreeNodeColor.BLACK;
                    uncle.color = ERedBlackTreeNodeColor.BLACK;
                    grandParent.color = ERedBlackTreeNodeColor.RED;
                    node = grandParent;
                } else {
                    if (node === node.parent.left) {
                        node = node.parent;
                        this.rightRotate(node);
                    }

                    node.parent!.color = ERedBlackTreeNodeColor.BLACK;
                    grandParent.color = ERedBlackTreeNodeColor.RED;

                    this.leftRotate(grandParent);
                }
            }
        }

        this.root!.color = ERedBlackTreeNodeColor.BLACK;
    }

    private _delete(node: RedBlackTreeNode<T>) {
        if (node.left && node.right) {
            const successor = this.minimum(node.right);
            node.value = successor!.value;
            node = successor!;
        }

        let child: RedBlackTreeNode<T> | null;

        if (node.left) {
            child = node.left;
        } else if (node.right) {
            child = node.right;
        } else {
            child = null;
        }

        if (!child) {
            if (node.color === ERedBlackTreeNodeColor.BLACK) {
                this._deleteCaseOne(node);
            }

            this._removeNode(node);
        } else {
            if (node.color === ERedBlackTreeNodeColor.BLACK) {
                if (child.color === ERedBlackTreeNodeColor.RED) {
                    child.color = ERedBlackTreeNodeColor.BLACK;
                } else {
                    this._deleteCaseOne(node);
                }
            }

            this._replaceNode(node, child);
        }
    }

    private _deleteCaseOne(node: RedBlackTreeNode<T>) {
        if (node.parent) {
            this._deleteStaTwo(node);
        }
    }

    private _deleteStaTwo(node: RedBlackTreeNode<T>) {
        const sibling = this._sibling(node);

        if (sibling && sibling.color === ERedBlackTreeNodeColor.RED) {
            node.parent!.color = ERedBlackTreeNodeColor.RED;

            sibling.color = ERedBlackTreeNodeColor.BLACK;

            if (node === node.parent!.left) {
                this.leftRotate(node.parent!);
            } else {
                this.rightRotate(node.parent!);
            }
        }

        this._deleteStaThree(node);
    }

    private _deleteStaThree(node: RedBlackTreeNode<T>) {
        const sibling = this._sibling(node);

        if (
            node.parent!.color === ERedBlackTreeNodeColor.BLACK &&
            sibling &&
            sibling.color === ERedBlackTreeNodeColor.BLACK &&
            (!sibling.left || sibling.left.color === ERedBlackTreeNodeColor.BLACK) &&
            (!sibling.right || sibling.right.color === ERedBlackTreeNodeColor.BLACK)
        ) {
            sibling.color = ERedBlackTreeNodeColor.RED;

            this._deleteCaseOne(node.parent!);
        } else {
            this._deleteStaFour(node);
        }
    }

    private _deleteStaFour(node: RedBlackTreeNode<T>) {
        const sibling = this._sibling(node);

        if (
            node.parent!.color === ERedBlackTreeNodeColor.RED &&
            sibling &&
            sibling.color === ERedBlackTreeNodeColor.BLACK &&
            (!sibling.left || sibling.left.color === ERedBlackTreeNodeColor.BLACK) &&
            (!sibling.right || sibling.right.color === ERedBlackTreeNodeColor.BLACK)
        ) {
            sibling.color = ERedBlackTreeNodeColor.RED;

            node.parent!.color = ERedBlackTreeNodeColor.BLACK;
        } else {
            this._deleteStaFive(node);
        }
    }

    private _deleteStaFive(node: RedBlackTreeNode<T>) {
        const sibling = this._sibling(node);

        if (sibling && sibling.color === ERedBlackTreeNodeColor.BLACK) {
            if (
                node === node.parent!.left &&
                sibling.right &&
                sibling.right.color === ERedBlackTreeNodeColor.RED
            ) {
                sibling.color = ERedBlackTreeNodeColor.RED;
                sibling.right!.color = ERedBlackTreeNodeColor.BLACK;

                this.leftRotate(sibling);
            } else if (
                node === node.parent!.right &&
                sibling.left &&
                sibling.left.color === ERedBlackTreeNodeColor.RED
            ) {
                sibling.color = ERedBlackTreeNodeColor.RED;
                sibling.left!.color = ERedBlackTreeNodeColor.BLACK;

                this.rightRotate(sibling);
            }
        }

        this._deleteStaSix(node);
    }

    private _deleteStaSix(node: RedBlackTreeNode<T>) {
        const sibling = this._sibling(node);

        sibling!.color = node.parent!.color;
        node.parent!.color = ERedBlackTreeNodeColor.BLACK;

        if (node === node.parent!.left) {
            sibling!.right!.color = ERedBlackTreeNodeColor.BLACK;

            this.leftRotate(node.parent!);
        } else {
            sibling!.left!.color = ERedBlackTreeNodeColor.BLACK;

            this.rightRotate(node.parent!);
        }
    }

    private _removeNode(node: RedBlackTreeNode<T>) {
        if (!node.parent) {
            this.root = null;
        } else if (node === node.parent.left) {
            node.parent.left = null;
        } else {
            node.parent.right = null;
        }
    }

    private _replaceNode(oldNode: RedBlackTreeNode<T>, newNode: RedBlackTreeNode<T>) {
        if (!oldNode.parent) {
            this.root = newNode;
        } else if (oldNode === oldNode.parent.left) {
            oldNode.parent.left = newNode;
        } else {
            oldNode.parent.right = newNode;
        }
        newNode.parent = oldNode.parent;
    }

    private _sibling(node: RedBlackTreeNode<T>) {
        if (!node.parent) {
            return null;
        }
        return node === node.parent.left ? node.parent.right : node.parent.left;
    }

    insert(value: T) {
        let newNode = new RedBlackTreeNode(value);

        if (!this.root) {
            this.root = newNode;
            newNode.color = ERedBlackTreeNodeColor.BLACK;
            return;
        }

        let current: RedBlackTreeNode<T> | null = this.root;
        let parent: RedBlackTreeNode<T> | null = null;

        while (current) {
            parent = current;
            if (value < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        newNode.parent = parent;

        if (value < parent!.value) {
            parent!.left = newNode;
        } else {
            parent!.right = newNode;
        }

        this.fixInsertion(newNode);
    }

    delete(value: T) {
        const nodeToDelete = this.searchTargetNode(value);

        if (!nodeToDelete) {
            return;
        }

        this._delete(nodeToDelete);
    }

    minimum(targetTreeNode: RedBlackTreeNode<T> | null = this.root): RedBlackTreeNode<T> | null {
        let current = targetTreeNode;

        while (current && current.left) {
            current = current.left;
        }

        return current;
    }
}

export {
    RedBlackTreeNode,
    RedBlackTree,
};
