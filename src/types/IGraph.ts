/**
 * 图结构相关接口/类型
 */

// 顶点接口
interface IVertex<T> {
    value: T; // 顶点中保存的值
}

// 图接口
interface IGraph<T> {
    /**
     * 插入操作
     */
    addVertex(value: T): void; // 向图中添加顶点
    addEdge(valueOne: T, valueTwo: T): boolean; // 指定顶点和顶点之间的连线（即向图中添加边）；如果指定成功则返回 true ；否则返回 false

    /**
     * 搜索操作
     */
    breadthFirstSearch(callbackFn?: (vertex: IVertex<T>) => void): void; // 广度优先搜索
    depthFirstSearch(callbackFn: (vertex: IVertex<T>) => void): void; // 深度优先搜索
}

export {
    IVertex,
    IGraph
};
