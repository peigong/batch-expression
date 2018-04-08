import ItemType from '../enums/item-type.es6';

/**
 * 根据前序遍历（DLR）的表达式形式（先根遍历）创建赋值回调函数
 * @param commands {Object} 命令对象
 * @return {Function} 赋值回调函数
 */
function createDLRCalculate(commands){
    /**
     * 根据前序遍历（DLR）的表达式形式（先根遍历）创建赋值回调函数
     * @param item {Object} 计算的依据对象
     * @param expression {Array} 前序遍历（DLR）的表达式形式（先根遍历）
     * @return {Integer} 计算结果
     */
    return (item, expression) => {
        function exec(o, v1, v2){
            console.log('%d %s %d', v1.val, o.origin, v2.val);
            let val = commands[o.val](convert(v1), convert(v2));
            return { type: ItemType.Constant, val: val, origin: val };
        }
        let result = null;
        return result.val;
    };
}

export { createDLRCalculate };
export default createDLRCalculate;

