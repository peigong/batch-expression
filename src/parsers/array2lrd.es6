
import ItemType from '../enums/item-type.es6';

/**
 * 表达式从标准数据的数组形式转换为后根遍历（LRD）的表达式形式
 * @param expression {Array} 标准数据的数组形式
 * @return {Array} 后根遍历（LRD）的表达式形式
 */
function array2lrd(expression = []){
    let result = [];
    let stack = [];
    for(let i = 0; i < expression.length; i++){
        let it = expression[i];
        switch(it.type){
            case ItemType.Operator:
                let o = stack.pop();
                while(o){
                    if(it.weight > o.weight){
                        stack.push(o);
                        break;
                    }else{
                        result.push(o);
                    }
                    o = stack.pop();
                }
                stack.push(it);
                break;
            case ItemType.Constant:
            case ItemType.Field:
                result.push(it);
                break;
            default:
        }
    }
    return result.concat(stack.reverse());
}
export { array2lrd };
export default array2lrd;

