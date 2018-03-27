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
        let result;
        let v = {};
        let stack = [], temp = null, v1, v2;
        let it = expression.shift();
        while(it){
            switch(it.type){
                case ItemType.Operator:
                    if(temp){ stack.push(temp);
                    temp = it;
                    break;
                case ItemType.Constant:
                    if(v.hasOwnProperty('v1')){
                        v['v2'] = it.val;
                    }else{
                        v['v1'] = it.val;
                    }
                    break;
                case ItemType.Field:
                    if(v.hasOwnProperty('v1')){
                        v['v2'] = item[it.val];
                    }else{
                        v['v1'] = item[it.val];
                    }
                    break;
                default:
            }
            it = expression.shift();
        }
        return result;
    };
}

export { createDLRCalculate };
export default { createDLRCalculate };
