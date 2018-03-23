import createMapCallback from '../src/index.es6';

describe('入口主函数测试', () => {
    let items;

    beforeEach(() => {
        items = [ { 'foo': 'foo' } ];
    });
    afterEach(() => {
        items = null;
    });

    it('待赋值字段为空的场景', () => {
        let exec = createMapCallback('', 'bar');
        let arr = items.map(exec);
        expect(arr[0]['foo']).toBe('foo');
    });
    it('表达式为空的场景', () => {
        let exec = createMapCallback('foo', '');
        let arr = items.map(exec);
        expect(arr[0]['foo']).toBe('foo');
    });
    it('表达式首字符非等号的简单场景', () => {
        let exec = createMapCallback('foo', 'bar');
        let arr = items.map(exec);
        expect(arr[0]['foo']).toBe('bar');
    });
    it('表达式首字符为等号的复杂场景', () => {
    });
});
