
import ItemType from '../enums/item-type.es6';

/**
 * 表达式从后根遍历（LRD）的形式转换成字符串
 * @param expression {Array} 后根遍历（LRD）的表达式形式
 * @return {String} 表达式的字符串形式 
 */
function lrd2string(expression = []){
    return expression.map((it) => {
        let result = '';
        switch(it.type){
            case ItemType.Field:
                result = `#${ it.origin }#`;
                break;
            case ItemType.Constant:
            case ItemType.Operator:
                result = it.origin;
                break;
            default:
        }
        return result;
    }).join('');
}
export { lrd2string };
export default lrd2string;

