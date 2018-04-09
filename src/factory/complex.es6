import createLRDCalculate from './lrd.es6';
import { commands } from '../operations/index.es6';
import string2array from '../parsers/string2array.es6';
import array2lrd from '../parsers/array2lrd.es6';

/**
 * 根据赋值字符串创建简单赋值回调函数
 * @param field {String} 赋值的数据字段名称
 * @param expression {String} 赋值字符串
 * @return {Function} 赋值回调函数
 */
function createComplexCallback(field, expression){
    if(expression){
        let calculate = createLRDCalculate(commands);
        expression = [string2array, array2lrd].reduce((expression, exec) => exec(expression), expression);
        return (item) => {
            item[field] = calculate(item, expression);
            return item;
        };
    }else{
        return (item) => item;
    }
}

export { createComplexCallback };
export default createComplexCallback;
