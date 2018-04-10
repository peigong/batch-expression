
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
        let o = null;
        let it = expression[i];
        switch(it.type){
            case ItemType.Operator:
                switch(it.val){
                    case '(':
                        stack.push(it);
                        break;
                    case ')':
                        o = stack.pop();
                        while(o){
                            if('(' === o.val){
                                break;
                            }else{
                                result.push(o);
                            }
                            o = stack.pop();
                        }
                        break;
                    default:
                        o = stack.pop();
                        while(o){
                            if(it.weight < o.weight){
                                result.push(o);
                            }else{
                                stack.push(o);
                                break;
                            }
                            o = stack.pop();
                        }
                        stack.push(it);
                }
                break;
            case ItemType.Constant:
            case ItemType.Field:
                result.push(it);
                break;
            default:
        }
    }
    return [].concat(result, stack.reverse());
}
export { array2lrd };
