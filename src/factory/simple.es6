/**
 * 根据赋值字符串创建简单赋值回调函数
 * @param field {String} 赋值的数据字段名称
 * @param expression {String} 赋值字符串
 * @return {Function} 赋值回调函数
 */
function createSimpleCallback(field = '', expression = ''){
    if(expression){
        return (item) => {
            item[field] = expression;
            return item;
        };
    }else{
        return (item) => item;
    }
}

export { createSimpleCallback };
