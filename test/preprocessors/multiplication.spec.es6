import multiplication from '../../src/preprocessors/multiplication.es6';

describe('测试乘法预处理函数', () => {
    it('基本功能', () => {
        expect(multiplication('1*1****1x1X1ｘ1X1')).toBe('1*1*1*1*1*1*1');
    });
});
