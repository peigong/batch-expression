import ItemType from '../enums/item-type.es6';

/**
 * 根据前序遍历（DLR）的表达式形式（先根遍历）创建赋值回调函数
 * @param commands {Object} 命令对象
 * @return {Function} 赋值回调函数
 */
function createDLRCalculate(commands){
    /**
     * 根据前序遍历（DLR）的表达式形式（先根遍历）创建赋值回调函数
     * @param item {Object} 计算的依据对象
     * @param expression {Array} 前序遍历（DLR）的表达式形式（先根遍历）
     * @return {Integer} 计算结果
     */
    return (item, expression) => {
        function convert(v){
            let val = NaN;
            switch(v.type){
                case ItemType.Constant:
                    val = v.val;
                    break;
                case ItemType.Field:
                    val = item[v.val];
                    break;
                case ItemType.Operator:
                default:
            }
            return val;
        }
        function exec(o, v1, v2){
            let val = commands[o.val](convert(v1), convert(v2));
            return { type: ItemType.Constant, val: val, origin: val };
        }

        let flag = false; // 是否已经有了第一个操作数
        let stack = [];
        let it = expression.shift();
        while(it){
            if(ItemType.Operator === it.type){
                flag = false;
                stack.push(it);
            }else if(flag){ // 已经有了第一个操作数，可以开始计算
                let v2 = it;
                let v1 = stack.pop();
                let o = stack.pop();
                let r = exec(o, v1, v2);
                stack.push(r);
            }else{
                stack.push(it);
                flag = true;
            }
            it = expression.shift();
        }
        console.log(stack);
        let result = stack.pop();
        return result.val;
    };
}

export { createDLRCalculate };
export default createDLRCalculate;
