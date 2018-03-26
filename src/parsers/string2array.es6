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

    function push(type, val, origin){
        items.push({ type, val, origin });
    }
    function clean(type = ItemType.Constant){
        if(temp){
            let val = parseFloat(temp);
            if(isNaN(val)){ // 字符串值
                push(type, temp, temp);
            }else{
                push(type, val, temp);
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
                push(ItemType.Operator, 'addition', '+');
                break;
            case '-':
                clean();
                push(ItemType.Operator, 'subtraction', '-');
                break;
            case '*':
                clean();
                push(ItemType.Operator, 'multiplication', '*');
                break;
            case '/':
                clean();
                push(ItemType.Operator, 'division', '/');
                break;
            case '(':
                push(ItemType.Operator, '(', '(');
                break;
            case ')':
                clean();
                push(ItemType.Operator, ')', ')');
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
