import ItemType from '../enums/item-type.es6';

/**
 * 表达式从标准数据的数组形式转换为前序遍历（DLR）的表达式形式（先根遍历）
 * @param expression {Array} 标准数据的数组形式
 * @return {Array} 前序遍历（DLR）的表达式形式（先根遍历）
 */
function array2dlr(expression = []){
    let items = [];
    let it = expression.shift();
    while(it){
        if(ItemType.Operator === it.type){
            let o = items.pop();
            items.push(it);
            items.push(o);

        }else{
            items.push(it);
        }
        it = expression.shift();
    }
    return items;
}
export { array2dlr };
export default array2dlr;

