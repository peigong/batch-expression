/**
 * 根据列的索引生成大写字母表示列别名
 * @param idx {Integer} 列的数字索引
 * @return {String} 列的别名
 */
function createColumnAlias(idx){
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const len = alphabet.length;

    let result = [];
    let floor = idx + 1;
    while(floor){
        let i = (floor - 1) % len;
        floor = Math.floor(floor / len);
        result.unshift(alphabet[i]);
    }
    return result.join('');
}

export { createColumnAlias };
export default {
    createColumnAlias
}
