import { multiplication } from '../../src/operations/multiplication.es6';

describe('测试乘法操作函数', () => {
    it('基本功能', () => {
        expect(multiplication(2, 3)).toBe(6);
    });
});
