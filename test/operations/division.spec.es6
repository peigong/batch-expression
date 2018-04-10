import { division } from '../../src/operations/division.es6';

describe('测试除法操作函数', () => {
    it('基本功能', () => {
        expect(division(6, 2)).toBe(3);
    });
});
