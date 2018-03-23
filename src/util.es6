/**
 * 根据列的序号生成大写字母表示列别名
 * @param num {Integer} 列的数字序号
 * @return {String} 列的别名
 */
function createColumnAlias(num){
    const alphabet = 'ZABCDEFGHIJKLMNOPQRSTUVWXY';
    const len = alphabet.length;

    let result = [];
    while(num){
        let mod = num % len;
        if(0 === mod){
            num -= len;
        }
        num = Math.floor(num / len);
        result.unshift(alphabet[mod]);
    }
    return result.join('');
}
export { createColumnAlias };

/**
 * 根据列的索引生成大写字母表示列别名
 * @param idx {Integer} 列的数字索引
 * @return {String} 列的别名
 */
function createColumnAliasByIndex(idx){
    return createColumnAlias(idx + 1);
}
export { createColumnAliasByIndex };

export default {
    createColumnAlias,
    createColumnAliasByIndex
}
