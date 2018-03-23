import util from './util.es6';
import { trim, preprocess } from './preprocessors/index.es6';
import { createSimpleCallback, createComplexCallback } from './factory/index.es6';

function createMapCallback(field = '', expression = ''){
    field = trim(field); // 清除赋值字段两端可能有的空白
    expression = preprocess(expression);
    if(field && expression){
        if('=' === expression[0]){
            return createComplexCallback(field, expression.substring(1));
        }else{
            return createSimpleCallback(field, expression);
        }
    }else{
        return (item) => item;
    }
}

export { util, createMapCallback };
export default createMapCallback;
