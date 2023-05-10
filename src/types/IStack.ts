/**
 * 栈结构相关接口/类型
 */

import { IList } from "./IList";

interface IStack<T> extends IList<T> {
    push(element: T): void; // 添加一个新元素到栈顶位置
    pop(): T | undefined; // 移除栈顶的元素，同时返回被移除的元素；栈为空时返回 `undefined`
    peek(): T | undefined; // 获取栈顶的元素（不移除元素，只返回元素）
};

export {
    IStack,
};
