/**
 * 图结构
 */

import type { IVertex, IGraph } from "../../types";

import { SinglyQueue, Stack } from "../index";

class Vertex<T = any> implements IVertex<T> {
    constructor(public value: T) { }
}

class Graph<T = any> implements IGraph<T> {
    private vertices: Vertex<T>[] = [];
    private adjoinList: WeakMap<Vertex<T>, Vertex<T>[]> = new WeakMap();

    private findVertex(value: T): Vertex<T> | null {
        const _verticesNum = this.vertices.length;
        for (let _index = 0; _index < _verticesNum; _index++) {
            const _vertex = this.vertices[_index];

            if (_vertex.value === value) {
                return _vertex;
            }
        }

        return null;
    }

    addVertex(value: T) {
        const _newVertex = new Vertex<T>(value);

        this.vertices.push(_newVertex);

        this.adjoinList.set(_newVertex, []);
    }

    addEdge(valueOne: T, valueTwo: T): boolean {
        const _vertexOne = this.findVertex(valueOne);
        const _vertexTwo = this.findVertex(valueTwo);

        if (_vertexOne && _vertexTwo) {
            const _isAttachmentExist = this.adjoinList.get(_vertexOne)!.some((_adjacentVertex) => _adjacentVertex === _vertexTwo) || this.adjoinList.get(_vertexTwo)!.some((_adjacentVertex) => _adjacentVertex === _vertexOne);

            if (_isAttachmentExist) {
                console.warn('[addEdge] 指定的两个顶点已经存在连线关系，不需要重复指定');

                return false;
            } else {
                this.adjoinList.get(_vertexOne)!.push(_vertexTwo);
                this.adjoinList.get(_vertexTwo)!.push(_vertexOne);

                return true;
            }
        } else {
            console.warn('[addEdge] 需要指定连线的顶点不存在于顶点列表中，指定连线失败');
            return false;
        }
    }

    breadthFirstSearch(callbackFn?: (vertex: Vertex<T>) => void) {
        if (this.vertices.length === 0) {
            console.info('[breadthFirstSearch] 图结构中不包含任何顶点，无需遍历');

            return;
        }

        const _verticesQueue = new SinglyQueue<Vertex<T>>();

        _verticesQueue.enqueue(this.vertices[0]);

        const _visitedVertices: Set<Vertex<T>> = new Set();

        _visitedVertices.add(this.vertices[0]);

        while (_verticesQueue.size > 0) {
            const _vertex = _verticesQueue.dequeue()!;

            callbackFn && callbackFn(_vertex);

            const _adjoinList = this.adjoinList.get(_vertex)!;

            if (!_adjoinList.length) continue;

            for (const _adjacentVertices of _adjoinList) {
                if (!_visitedVertices.has(_adjacentVertices)) {
                    _visitedVertices.add(_adjacentVertices);
                    _verticesQueue.enqueue(_adjacentVertices);
                }
            }
        }
    }

    depthFirstSearch(callbackFn: (vertex: Vertex<T>) => void) {
        if (this.vertices.length === 0) {
            console.info('[breadthFirstSearch] 图结构中不包含任何顶点，无需遍历');

            return;
        }

        const _verticesStack = new Stack<Vertex<T>>();

        _verticesStack.push(this.vertices[0]);

        const _visitedVertices = new Set<Vertex<T>>();

        _visitedVertices.add(this.vertices[0]);

        while (_verticesStack.size > 0) {
            const _vertex = _verticesStack.pop()!;

            callbackFn && callbackFn(_vertex);

            const _adjoinList = this.adjoinList.get(_vertex)!;

            if (!_adjoinList.length) continue;

            const _adjoinListLength = _adjoinList.length;
            for (let _index = _adjoinListLength - 1; _index >= 0; _index--) {
                const _adjacentVertices = _adjoinList[_index];

                if (!_visitedVertices.has(_adjacentVertices)) {
                    _visitedVertices.add(_adjacentVertices);
                    _verticesStack.push(_adjacentVertices);
                }
            }
        }
    }
}

export {
    Vertex,
    Graph,
};
