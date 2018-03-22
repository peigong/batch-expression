/**
 * 清除表达式字符串中的空白字符
 * @param expression {String} 预处理前的表达式字符串
 * @return {String} 预处理过的表达式字符串
 */
function blank(expression){
    return expression.replace(/\s+/g, '');
}

export { blank };
export default blank;
