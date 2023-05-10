/**
 * 树结构相关类型/接口
 */

// 红黑树节点颜色枚举
enum ERedBlackTreeNodeColor {
    RED,
    BLACK
};

// 树节点接口
interface ITreeNode<T> {
    value: T; // 树节点中保存的值
}

// 二叉搜索树节点接口
interface IBinarySearchTreeNode<T> extends ITreeNode<T> {
    left: IBinarySearchTreeNode<T> | null; // 左子节点
    right: IBinarySearchTreeNode<T> | null; // 右子节点

    /**
     * 增强二叉搜索树拓展性所需属性
     */
    parent: IBinarySearchTreeNode<T> | null; // 父节点
    get isLeftChild(): boolean; // 当前节点是否属于父节点的左子节点
    get isRightChild(): boolean; // 当前节点是否属于父节点的右子节点
}

// AVL树节点接口
interface IAVLTreeNode<T> extends IBinarySearchTreeNode<T> {
    /**
     * 树平衡相关方法
     */
    getBalanceFactor(): number; // 获取平衡因子
    get isBalanced(): boolean; // 当前AVL树节点是否处于平衡状态
    get higherChildNode(): IAVLTreeNode<T> | null; // 获取具有更大高度的子节点
    rotateRight(): void; // 以当前AVL树节点为根执行右旋转
    rotateLeft(): void; // 以当前AVL树节点为根执行左旋转
}

// 红黑树节点接口
interface IRedBlackTreeNode<T> extends IBinarySearchTreeNode<T> {
    color: ERedBlackTreeNodeColor; // 树节点颜色（红/黑）
}

// 树接口
interface ITree<T> {
}

// 二叉搜索树接口
interface IBinarySearchTree<T> extends ITree<T> {
    /**
     * 插入操作
     */
    insert(value: T): void; // 向二叉搜索树中插入一个新的数据

    /**
     * 查找操作
     */
    search(value: T): boolean; // 在二叉搜索树中查找一个数据，如果该数据以节点的形式存在于二叉搜索树中，则返回 true ；否则返回 false

    /**
     * 查找最值操作
     */
    findMax(): T | null; // 查找二叉搜索树中的最大值
    findMin(): T | null; // 查找二叉搜索树中的最小值

    /**
     * 删除操作
     */
    remove(value: T): boolean; // 从二叉搜索树中移除某个数据；如果删除成功，则返回 true ；如果删除失败，则返回 false

    /**
     * 遍历操作
     */
    preOrderTraverse(callbackFn?: (treeNode: IBinarySearchTreeNode<T>) => void): void; // 先序遍历
    inOrderTraverse(callbackFn?: (treeNode: IBinarySearchTreeNode<T>) => void): void; // 中序遍历
    postOrderTraverse(callbackFn?: (treeNode: IBinarySearchTreeNode<T>) => void): void; // 后序遍历
    levelOrderTraverse(callbackFn?: (treeNode: IBinarySearchTreeNode<T>) => void): void; // 层序遍历
}

// AVL树
interface IAVLTree<T> extends IBinarySearchTree<T> {
}

// 红黑树
interface IRedBlackTree<T> extends IBinarySearchTree<T> {
    minimum(targetTreeNode: IRedBlackTreeNode<T> | null): IRedBlackTreeNode<T> | null; // 查找某个树节点在红黑树中的最小值
}

export {
    ERedBlackTreeNodeColor,

    ITreeNode,
    IBinarySearchTreeNode,
    IAVLTreeNode,
    IRedBlackTreeNode,

    ITree,
    IBinarySearchTree,
    IAVLTree,
    IRedBlackTree,
};
