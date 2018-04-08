import ItemType from '../enums/item-type.es6';

/**
 * 表达式从字符串形式转换为标准数据的数组形式
 * @param val {String} 字符串形式的表达式
 * @return {Array} 标准数据的数组形式
 */
function string2array(val = ''){
    let items = [];
    let temp = '';
    let field = false; // 数据字段开关

    function push(type, val, origin, weight){
        items.push({ type, val, origin, weight });
    }
    function clean(type = ItemType.Constant){
        if(temp){
            let val = parseFloat(temp);
            if(isNaN(val)){ // 字符串值
                push(type, temp, temp, 0);
            }else{
                push(type, val, temp, 0);
            }
            temp = '';
        }
    }

    const len = val.length;
    for(let i = 0; i < len; i++){
        let c = val[i];
        switch(c){
            case '+':
                clean();
                push(ItemType.Operator, 'addition', '+', 1);
                break;
            case '-':
                clean();
                push(ItemType.Operator, 'subtraction', '-', 1);
                break;
            case '*':
                clean();
                push(ItemType.Operator, 'multiplication', '*', 2);
                break;
            case '/':
                clean();
                push(ItemType.Operator, 'division', '/', 2);
                break;
            case '(':
                push(ItemType.Operator, '(', '(', 3);
                break;
            case ')':
                clean();
                push(ItemType.Operator, ')', ')', 3);
                break;
            case '#':
                if(field){
                    clean(ItemType.Field);
                }
                field = !field;
                break;
            default:
                temp += c;
        }
    }
    return items;

}
export { string2array };
export default string2array;
