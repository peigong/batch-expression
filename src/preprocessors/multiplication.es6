/**
 * 对表达式字符串中的类乘法运算符进行预处理
 * @param expression {String} 预处理前的表达式字符串
 * @return {String} 预处理过的表达式字符串
 */
function multiplication(expression){
    return expression.replace(/\*+|x|X|ｘ|X/g, '*');
}

export { multiplication };
export default multiplication;
