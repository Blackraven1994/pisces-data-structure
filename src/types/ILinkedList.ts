/**
 * 链表相关类型/接口
 */

import { IList } from "./IList";

// 目标链结点类型
type targetNode<T = any> = INode<T> | null;

// 单向链表链结点接口
interface INode<T = any> {
    value: T; // 链结点中保存的值
    next: INode<T> | null; // 下一个链结点
}

// 单向链表链结点双指针接口
interface IDoublePointNode<T = any> {
    current: targetNode<T>; // 当前链结点
    previous: targetNode<T>; // 上一个链结点
}

// 双向链表链结点接口
interface IDoublyLinkedNode<T> extends INode<T> {
    next: IDoublyLinkedNode<T> | null; // 下一个链结点
    prev: IDoublyLinkedNode<T> | null; // 上一个链接点
}

// 单向链表接口
interface ILinkedList<T> extends IList<T> {
    append(value: T): void; // 向单向链表尾部添加一个新的项
    insert(element: T, position: number): boolean; // 向单向链表的指定位置插入一个新的项并且返回插入是否成功的结果
    get(position: number): T | null; // 获取单向链表指定位置的对应元素
    indexOf(element: T): number; // 返回指定元素在单向链表中的索引；如果单向链表中没有指定元素则返回-1
    update(position: number, element: T): boolean; // 修改单向链表指定位置的元素并且返回元素修改是否成功的结果
    removeAt(position: number): T | null; // 从单向链表的特定位置移除一项；如果移除失败返回 null ，如果移除成功则返回被移除的元素
    remove(element: T): boolean; //  从单向链表中移除一项并且返回移除是否成功的结果
    get length(): number; // 返回链表长度；实现该方法是为了方便数组和链表互相转化（ `get` 类型）
    traverse(): void; // 遍历列表，以指定的连接符将每个元素打印到控制台上
}

// 单向循环链表接口
interface ISinglyCircularLinkedList<T> extends ILinkedList<T> {

}

// 双向链表接口
interface IDoublyLinkedList<T> extends ILinkedList<T> {
    prepend(element: T): void; // 在双向链表头部添加元素
    postTraverse(callbackFn?: (linkedNode: IDoublyLinkedNode<T>) => void): void; // 从尾部遍历双向链表所有结点
}

export {
    targetNode,
    INode,
    IDoublyLinkedNode,
    IDoublePointNode,
    ILinkedList,
    ISinglyCircularLinkedList,
    IDoublyLinkedList,
}
