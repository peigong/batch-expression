/**
 * 根据前序遍历（DLR）的表达式形式（先根遍历）计算
 * @param item {Object} 计算的依据对象
 * @param expression {Array} 前序遍历（DLR）的表达式形式（先根遍历）
 * @return {Integer} 计算结果
 */
function calculate(item, expression){
    let result;
    return result;
}

/**
 * 根据前序遍历（DLR）的表达式形式（先根遍历）创建赋值回调函数
 * @param field {String} 赋值的数据字段名称
 * @param expression {Array} 前序遍历（DLR）的表达式形式（先根遍历）
 * @return {Function} 赋值回调函数
 */
function createCallbackByDLR(field, expression){
    return (item) => {
        item[field] = calculate(item, expression);
        return item;
    };
}

export { calculate, createCallbackByDLR };
export default calculate, createCallbackByDLR;
