import { createSimpleCallback } from '../../src/factory/simple.es6';

describe('测试简单表达式回调生成函数', () => {
    let items;

    beforeEach(() => {
        items = [ { 'f o o': 'foo' } ];
    });
    afterEach(() => {
        items = null;
    });

    it('基本功能', () => {
        let exec = createSimpleCallback('f o o', 'bar');
        let arr = items.map(exec);
        expect(arr[0]['f o o']).toBe('bar');
    });
    it('表达式为空字符串的场景', () => {
        let exec = createSimpleCallback('f o o', '');
        let arr = items.map(exec);
        expect(arr[0]['f o o']).toBe('foo');
    });
});
