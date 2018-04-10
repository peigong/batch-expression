import { trim } from './trim.es6';
import { blank } from './blank.es6';
import { multiplication } from './multiplication.es6';

function preprocess(expression){
    return [blank, multiplication]
    .reduce((expression, exec) => exec(expression), expression);
}

export { trim, blank, multiplication, preprocess };
