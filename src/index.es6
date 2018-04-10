import util from './util.es6';
import { trim, preprocess } from './preprocessors/index.es6';
import { createSimpleCallback, createComplexCallback, createMainGenerator } from './factory/index.es6';

const createCallback = createMainGenerator({
    trim,
    preprocess,
    createSimpleCallback,
    createComplexCallback
});
export {
    util,
    createCallback
};
