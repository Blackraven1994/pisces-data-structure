/**
 * 队列结构相关接口/类型
 */

import { IList } from "./IList";

// 单向队列接口
interface IQueue<T> extends IList<T> {
    enqueue(element: T): void;  // 向单向队列尾部添加一个（或多个）新的项
    dequeue(): T | undefined; // 移除单向队列的第一（即排在单向队列最前端）项，并返回被移除的元素
    front(): T | undefined; // 返回单向队列中第一个元素，单向队列不做任何变动（不移除元素，只返回元素信息）
    peek(): T | undefined; // 返回单向队列中第一个元素，单向队列不做任何变动（不移除元素，只返回元素信息）
};

// 双端队列接口
interface IDEQueue<T> extends IQueue<T> {
    enqueueFront(element: T): void; // 向双端队列头部添加一个（或多个）新的项
    dequeueBack(): T | undefined; // 移除双端队列的最后一项（即排在双端队列最后端的项），并返回被移除的元素
};

// 优先级队列节点接口
interface IPriorityNode<T> {
    value: T; // 优先级队列中保存的值
    priority: number; // 优先级

    valueOf(): number; // 优先级节点进行比较时使用的属性
}

// 优先级队列接口
interface IPriorityQueue<T> extends IList<T> {
    enqueue(element: T, priority: number): void; // 向优先级队列尾部添加一个（或多个）新的项
    dequeue(): T | undefined; // 移除优先级队列的第一项（即排在优先级队列最前端的项），并返回被移除的元素
    peek(): T | undefined; // 返回优先级队列中第一个元素，单向队列不做任何变动（不移除元素，只返回元素信息）
}

export {
    IQueue,
    IDEQueue,

    IPriorityNode,
    IPriorityQueue,
};
