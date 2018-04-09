import ItemType from '../enums/item-type.es6';

/**
 * 根据后根遍历（LRD）的表达式形式创建赋值回调函数
 * @param commands {Object} 命令对象
 * @return {Function} 赋值回调函数
 */
function createLRDCalculate(commands){
    /**
     * 根据后根遍历（LRD）的表达式形式创建赋值回调函数
     * @param it {Object} 计算的依据对象
     * @param expression {Array} 后根遍历（LRD）的表达式形式
     * @return {Integer} 计算结果
     */
    return (it, expression) => {
        function convert(v){
            let result = NaN;
            switch(v.type){
                case ItemType.Constant:
                    result = v.val;
                    break;
                case ItemType.Field:
                    result = it[v.val];
                    break;
                case ItemType.Operator:
                default:
            }
            return result;
        }
        function exec(o, v1, v2){
            let val = commands[o.val](convert(v1), convert(v2));
            return { type: ItemType.Constant, val: val, origin: val };
        }
        let stack = [];
        let o = expression.shift();
        while(o){
            switch(o.type){
                case ItemType.Operator:
                    let v2 = stack.pop();
                    let v1 = stack.pop();
                    stack.push(exec(o, v1, v2));
                    break;
                case ItemType.Constant:
                case ItemType.Field:
                    stack.push(o);
                    break;
                default:
            }
            o = expression.shift();
        }
        let result = stack.pop();
        return result.val;
    };
}

export { createLRDCalculate };
export default createLRDCalculate;

