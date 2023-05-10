/**
 * 类型/接口的统一出口文件
 */

// 线性结构
import { IList } from './IList';

// 栈结构
import { IStack } from './IStack';

// 队列结构
import { IQueue, IDEQueue, IPriorityNode, IPriorityQueue } from './IQueue';

// 链表结构
import { targetNode, INode, IDoublyLinkedNode, IDoublePointNode, ILinkedList, ISinglyCircularLinkedList, IDoublyLinkedList } from './ILinkedList';

// 树结构
import { ERedBlackTreeNodeColor, ITreeNode, IBinarySearchTreeNode, IAVLTreeNode, IRedBlackTreeNode, ITree, IBinarySearchTree, IAVLTree, IRedBlackTree } from './ITree';

// 堆结构
import { THeapType, IHeap } from './IHeap';

// 哈希表
import { TTuple, IHashTable } from './IHashTable';

// 图结构
import { IVertex, IGraph } from './IGraph';

export {
    IList,

    IStack,

    IQueue,
    IDEQueue,
    IPriorityNode,
    IPriorityQueue,

    targetNode,
    INode,
    IDoublyLinkedNode,
    IDoublePointNode,
    ILinkedList,
    ISinglyCircularLinkedList,
    IDoublyLinkedList,

    ERedBlackTreeNodeColor,
    ITreeNode,
    IBinarySearchTreeNode,
    IAVLTreeNode,
    IRedBlackTreeNode,
    ITree,
    IBinarySearchTree,
    IAVLTree,
    IRedBlackTree,

    THeapType,
    IHeap,

    TTuple,
    IHashTable,

    IVertex,
    IGraph,
};
