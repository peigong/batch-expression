import { subtraction } from '../../src/operations/subtraction.es6';

describe('测试减法操作函数', () => {
    it('基本功能', () => {
        expect(subtraction(3, 2)).toBe(1);
    });
});

