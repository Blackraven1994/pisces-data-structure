/**
 * 堆相关类型/接口
 */

// 二叉堆类型； "max" -> 最大堆； "min" -> 最小堆
type THeapType = 'max' | 'min';

// 堆（二叉堆）接口
interface IHeap<T> {
    insert(value: T): void; // 在堆中插入一个新元素
    extract(): T | undefined; // 从堆中删除最大/最小元素
    peek(): T | undefined; // 返回堆中的最大/最小元素
    isEmpty(): boolean; // 检查堆是否为空
    buildHeap(list: T[]): void; // 通过一个列表来构造堆（原地建堆）
    get size(): number; // 获取堆中存储的元素数量（即堆的大小）
}

export {
    THeapType,
    IHeap,
};
