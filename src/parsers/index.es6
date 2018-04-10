import { array2lrd } from '../parsers/array2lrd.es6';
import { lrd2string } from '../parsers/lrd2string.es6';
import { string2array } from '../parsers/string2array.es6';

let items = [string2array, array2lrd];

function convert(items = [], expression = ''){
    return items.reduce((expr, exec) => exec(expr), expression);
}
function convertLRDArray(expression){
    return convert([].concat(items), expression);
}

function convertLRDString(expression){
    return convert([].concat(items, [ lrd2string ]), expression);
}

export {
    convertLRDArray,
    convertLRDString
};
