/**
 * 线性结构接口
 */

interface IList<T> {
    isEmpty(): boolean; // 线性结构是否为空
    get size(): number; // 线性结构的大小
}

export {
    IList,
};
