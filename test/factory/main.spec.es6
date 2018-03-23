import createMainGenerator from '../../src/factory/main.es6';

describe('入口主函数测试', () => {
    let items, commands, createCallback;

    beforeEach(() => {
        items = [ { 'foo': 'foo' } ];
        commands = {
            trim: val => val,
            preprocess: val => val,
            createSimpleCallback: val => val,
            createComplexCallback: val => val
        };
        spyOn(commands, 'trim').and.callThrough();
        spyOn(commands, 'preprocess').and.callThrough();
        spyOn(commands, 'createSimpleCallback');
        spyOn(commands, 'createComplexCallback');
        createCallback = createMainGenerator(commands);
    });
    afterEach(() => {
        items = null;
        commands = null;
        createCallback = null;
    });

    it('待赋值字段为空的场景', () => {
        let exec = createCallback('', 'bar');
        let arr = items.map(exec);
        expect(commands.trim).toHaveBeenCalledWith('');
        expect(commands.preprocess).toHaveBeenCalledWith('bar');
        expect(arr[0]['foo']).toBe('foo');
    });
    it('表达式为空的场景', () => {
        let exec = createCallback('foo', '');
        let arr = items.map(exec);
        expect(commands.trim).toHaveBeenCalledWith('foo');
        expect(commands.preprocess).toHaveBeenCalledWith('');
        expect(arr[0]['foo']).toBe('foo');
    });
    it('表达式首字符非等号的简单场景', () => {
        let exec = createCallback('foo', 'bar');
        expect(commands.trim).toHaveBeenCalledWith('foo');
        expect(commands.preprocess).toHaveBeenCalledWith('bar');
        expect(commands.createSimpleCallback).toHaveBeenCalledWith('foo', 'bar');
    });
    it('表达式首字符为等号的复杂场景', () => {
        let exec = createCallback('foo', '=bar');
        expect(commands.trim).toHaveBeenCalledWith('foo');
        expect(commands.preprocess).toHaveBeenCalledWith('=bar');
        expect(commands.createComplexCallback).toHaveBeenCalledWith('foo', 'bar');
    });
});
