import ItemType from '../enums/item-type.es6';
import { array2lrd } from '../parsers/array2lrd.es6';
import { lrd2string } from '../parsers/lrd2string.es6';
import { string2array } from '../parsers/string2array.es6';

let items = [string2array, array2lrd];

/**
 *
 * @param expression {String} 字符串形式的表达式
 */
function convert(items = [], expression = ''){
    return items.reduce((expr, exec) => exec(expr), expression);
}

/**
 * 将符合表达式规范的字符串转换为后根遍历的数组形式。
 * @param expression {String} 字符串形式的表达式
 */
function convertLRDArray(expression){
    return convert([].concat(items), expression);
}

/**
 * 将符合表达式规范的字符串转换为后根遍历的简单数组形式。
 * @param expression {String} 字符串形式的表达式
 */
function convertLRDSimpleArray(expression){
    return convertLRDArray(expression).map((it) => {
        let result = '';
        switch(it.type){
            case ItemType.Field:
                result = `#${ it.origin }`;
                break;
            case ItemType.Constant:
            case ItemType.Operator:
                result = it.origin;
                break;
            default:
        }
        return result;
    });
}

/**
 * 将符合表达式规范的字符串转换为后根遍历的字符串形式。
 * @param expression {String} 字符串形式的表达式
 */
function convertLRDString(expression){
    return convert([].concat(items, [ lrd2string ]), expression);
}

export {
    convertLRDArray,
    convertLRDSimpleArray,
    convertLRDString
};
