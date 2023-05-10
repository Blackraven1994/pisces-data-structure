/**
 * 哈希表相关类型/接口
 */

// 元祖类型
type TTuple<T> = [string, T];

// 哈希表接口
interface IHashTable<T> { // 向哈希表中插入/修改某个 value 值
    put(key: string, value: T): void;
    get(key: string): T | null; // 根据 key 值获取哈希表中对应的 value 值；如果该 key 值没有在哈希表中存储过则返回 null
    delete(key: string): T | null; // 根据 key 值删除哈希表中对应的 key/value 值；如果删除失败则返回 null ，如果删除成功则返回被删除的 value 值
}

export {
    TTuple,

    IHashTable,
};
