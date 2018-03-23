/**
 * 注入命令对象，创建主回调函数生成器。
 * @param commands {Object} 注入的命令对象
 * {
 *     trim,
 *     preprocess,
 *     createSimpleCallback,
 *     createComplexCallback
 * }
 * @return {Function} 主回调函数生成器
 */
function createMainGenerator(commands){
    return function createCallback(field = '', expression = ''){
        field = commands.trim(field); // 清除赋值字段两端可能有的空白
        expression = commands.preprocess(expression);
        if(field && expression){
            if('=' === expression[0]){
                return commands.createComplexCallback(field, expression.substring(1));
            }else{
                return commands.createSimpleCallback(field, expression);
            }
        }else{
            return (item) => item;
        }
    };
}

export { createMainGenerator };
export default createMainGenerator;
