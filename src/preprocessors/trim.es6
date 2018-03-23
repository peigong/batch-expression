/**
 * 清除两端空白
 * @param val {String} 预处理前的字符串
 * @return {String} 预处理过的字符串
 */
function trim(val){
    return val.replace(/^\s+|\s+$/g, '');
}

export { trim };
export default trim;
