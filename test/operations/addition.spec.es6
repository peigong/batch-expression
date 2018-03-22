import addition from '../../src/operations/addition.es6';

describe('测试加法操作函数', () => {
    it('基本功能', () => {
        expect(addition(1, 2)).toBe(3);
    });
});
