import { preprocess } from '../../src/preprocessors/index.es6';

describe('测试预处理函数', () => {
    it('基本功能', () => {
        expect(preprocess('(#foo# + #bar# x (#foobar# - #bar#)) / #foo#')).toBe('(#foo#+#bar#*(#foobar#-#bar#))/#foo#');
    });
});
