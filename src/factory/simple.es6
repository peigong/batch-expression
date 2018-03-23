function createSimpleCallback(field = '', expression = ''){
    if(expression){
        return (item) => {
            item[field] = expression;
            return item;
        };
    }else{
        return (item) => item;
    }
}

export { createSimpleCallback };
export default createSimpleCallback;
