import ItemType from '../../src/enums/item-type.es6';
import createDLRCalculate from '../../src/factory/dlr.es6';

// (#foo#+2+#bar#*(#foobar#-#bar#))/#foo#
describe('测试根据前序遍历（DLR）的表达式形式（先根遍历）计算函数', () => {
    let item, commands, calculate;

    beforeEach(() => {
        item = { 'foo': 2, 'bar': 3, 'foobar': 5 };
        commands = {
            addition: (v1, v2) => v1 + v2,
            subtraction: (v1, v2) => v1 - v2,
            multiplication: (v1, v2) => v1 * v2,
            division : (v1, v2) => v1 / v2
        };
        spyOn(commands, 'addition').and.callThrough();
        spyOn(commands, 'subtraction').and.callThrough();
        spyOn(commands, 'multiplication').and.callThrough();
        spyOn(commands, 'division').and.callThrough();
        calculate = createDLRCalculate(commands);
    });
    afterEach(() => {
        item = null;
        commands = null;
        calculate = null;
    });

    it('基本功能 #foo#+2', () => {
        let result = calculate(item, [
            { type: ItemType.Operator, val: 'addition', origin: '+' },
            { type: ItemType.Field, val: 'foo', origin: 'foo' },
            { type: ItemType.Constant, val: 2, origin: '2' }
        ]);
        expect(result).toBe(4);
        expect(commands.addition).toHaveBeenCalledWith(2, 2);
    });
    it('基本功能 #foo#+2+#bar#', () => {
        let result = calculate(item, [
            { type: ItemType.Operator, val: 'addition', origin: '+' },
            { type: ItemType.Field, val: 'foo', origin: 'foo' },
            { type: ItemType.Operator, val: 'addition', origin: '+' },
            { type: ItemType.Constant, val: 2, origin: '2' },
            { type: ItemType.Field, val: 'bar', origin: 'bar' }
        ]);
        expect(result).toBe(7);
    });
    // it('完整公式功能', () => {
    //     // (#foo#+2+#bar#*(#foobar#-#bar#))/#foo#
    //     let result = calculate(item, [
    //         { type: ItemType.Operator, val: 'division', origin: '/' },
    //         { type: ItemType.Operator, val: 'addition', origin: '+' },
    //         { type: ItemType.Operator, val: 'addition', origin: '+' },
    //         { type: ItemType.Field, val: 'foo', origin: 'foo' },
    //         { type: ItemType.Constant, val: 2, origin: '2' },
    //         { type: ItemType.Operator, val: 'multiplication', origin: '*' },
    //         { type: ItemType.Field, val: 'bar', origin: 'bar' },
    //         { type: ItemType.Operator, val: 'subtraction', origin: '-' },
    //         { type: ItemType.Field, val: 'foobar', origin: 'foobar' },
    //         { type: ItemType.Field, val: 'bar', origin: 'bar' },
    //         { type: ItemType.Field, val: 'foo', origin: 'foo' }
    //     ]);
    //     expect(result).toBe(5);
    //     // expect(commands.addition).toHaveBeenCalledWith(2, 2);
    // });
});
