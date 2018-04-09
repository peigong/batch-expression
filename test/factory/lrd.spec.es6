import ItemType from '../../src/enums/item-type.es6';
import createLRDCalculate from '../../src/factory/lrd.es6';

// (#foo#+2+#bar#*(#foobar#-#bar#))/#foo#
describe('测试根据后根遍历（LRD）的表达式形式计算的函数', () => {
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
        calculate = createLRDCalculate(commands);
    });
    afterEach(() => {
        item = null;
        commands = null;
        calculate = null;
    });

    it('基本功能 - 加减法', () => {
        // #foo#+2
        expect(calculate(item, [
            { type: ItemType.Field, val: 'foo', origin: 'foo', weight: 0 },
            { type: ItemType.Constant, val: 2, origin: '2', weight: 0 },
            { type: ItemType.Operator, val: 'addition', origin: '+', weight: 1 }
        ])).toBe(4);
        // #foo#+2+#bar#
        expect(calculate(item, [
            { type: ItemType.Field, val: 'foo', origin: 'foo', weight: 0 },
            { type: ItemType.Constant, val: 2, origin: '2', weight: 0 },
            { type: ItemType.Field, val: 'bar', origin: 'bar', weight: 0 },
            { type: ItemType.Operator, val: 'addition', origin: '+', weight: 1 },
            { type: ItemType.Operator, val: 'addition', origin: '+', weight: 1 }
        ])).toEqual(7);
        // #foo#+2+#bar#-#foobar#
        expect(calculate(item, [
            { type: ItemType.Field, val: 'foo', origin: 'foo', weight: 0 },
            { type: ItemType.Constant, val: 2, origin: '2', weight: 0 },
            { type: ItemType.Field, val: 'bar', origin: 'bar', weight: 0 },
            { type: ItemType.Field, val: 'foobar', origin: 'foobar', weight: 0 },
            { type: ItemType.Operator, val: 'subtraction', origin: '-', weight: 1 },
            { type: ItemType.Operator, val: 'addition', origin: '+', weight: 1 },
            { type: ItemType.Operator, val: 'addition', origin: '+', weight: 1 }
        ])).toEqual(2);
    });
    it('基本功能 - 加减乘除', () => {
        // #foo#+2*#bar#-#foobar#
        expect(calculate(item, [
            { type: ItemType.Field, val: 'foo', origin: 'foo', weight: 0 },
            { type: ItemType.Constant, val: 2, origin: '2', weight: 0 },
            { type: ItemType.Field, val: 'bar', origin: 'bar', weight: 0 },
            { type: ItemType.Operator, val: 'multiplication', origin: '*', weight: 2 },
            { type: ItemType.Field, val: 'foobar', origin: 'foobar', weight: 0 },
            { type: ItemType.Operator, val: 'subtraction', origin: '-', weight: 1 },
            { type: ItemType.Operator, val: 'addition', origin: '+', weight: 1 }
        ])).toEqual(3);
        // #foo#+2*#bar#/#foobar#
        expect(calculate(item, [
            { type: ItemType.Field, val: 'foo', origin: 'foo', weight: 0 },
            { type: ItemType.Constant, val: 2, origin: '2', weight: 0 },
            { type: ItemType.Field, val: 'bar', origin: 'bar', weight: 0 },
            { type: ItemType.Field, val: 'foobar', origin: 'foobar', weight: 0 },
            { type: ItemType.Operator, val: 'division', origin: '/', weight: 2 },
            { type: ItemType.Operator, val: 'multiplication', origin: '*', weight: 2 },
            { type: ItemType.Operator, val: 'addition', origin: '+', weight: 1 }
        ])).toEqual(3.2);
        // #foo#+2-#bar#/#foobar#
        expect(calculate(item, [
            { type: ItemType.Field, val: 'foo', origin: 'foo', weight: 0 },
            { type: ItemType.Constant, val: 2, origin: '2', weight: 0 },
            { type: ItemType.Field, val: 'bar', origin: 'bar', weight: 0 },
            { type: ItemType.Field, val: 'foobar', origin: 'foobar', weight: 0 },
            { type: ItemType.Operator, val: 'division', origin: '/', weight: 2 },
            { type: ItemType.Operator, val: 'subtraction', origin: '-', weight: 1 },
            { type: ItemType.Operator, val: 'addition', origin: '+', weight: 1 }
        ])).toEqual(3.4);
    });
    it('基本功能 - 带括号的加减乘除', () => {
        // #(foo#+2)*(#bar#-#foobar#)
        expect(calculate(item, [
            { type: ItemType.Field, val: 'foo', origin: 'foo', weight: 0 },
            { type: ItemType.Constant, val: 2, origin: '2', weight: 0 },
            { type: ItemType.Operator, val: 'addition', origin: '+', weight: 1 },
            { type: ItemType.Field, val: 'bar', origin: 'bar', weight: 0 },
            { type: ItemType.Field, val: 'foobar', origin: 'foobar', weight: 0 },
            { type: ItemType.Operator, val: 'subtraction', origin: '-', weight: 1 },
            { type: ItemType.Operator, val: 'multiplication', origin: '*', weight: 2 }
        ])).toEqual(-8);
        // (#foo#+2)*#bar#/#foobar#
        expect(calculate(item, [
            { type: ItemType.Field, val: 'foo', origin: 'foo', weight: 0 },
            { type: ItemType.Constant, val: 2, origin: '2', weight: 0 },
            { type: ItemType.Operator, val: 'addition', origin: '+', weight: 1 },
            { type: ItemType.Field, val: 'bar', origin: 'bar', weight: 0 },
            { type: ItemType.Field, val: 'foobar', origin: 'foobar', weight: 0 },
            { type: ItemType.Operator, val: 'division', origin: '/', weight: 2 },
            { type: ItemType.Operator, val: 'multiplication', origin: '*', weight: 2 }
        ])).toEqual(2.4);
        // #foo#+(2-#bar#)/#foobar#
        expect(calculate(item, [
            { type: ItemType.Field, val: 'foo', origin: 'foo', weight: 0 },
            { type: ItemType.Constant, val: 2, origin: '2', weight: 0 },
            { type: ItemType.Field, val: 'bar', origin: 'bar', weight: 0 },
            { type: ItemType.Operator, val: 'subtraction', origin: '-', weight: 1 },
            { type: ItemType.Field, val: 'foobar', origin: 'foobar', weight: 0 },
            { type: ItemType.Operator, val: 'division', origin: '/', weight: 2 },
            { type: ItemType.Operator, val: 'addition', origin: '+', weight: 1 }
        ])).toEqual(1.8);
    });
    it('完整功能 - (#foo#+2+#bar#*(#foobar#-#bar#))/#foo#', () => {
        // (#foo#+2+#bar#*(#foobar#-#bar#))/#foo#
        expect(calculate(item, [
            { type: ItemType.Field, val: 'foo', origin: 'foo', weight: 0 },
            { type: ItemType.Constant, val: 2, origin: '2', weight: 0 },
            { type: ItemType.Field, val: 'bar', origin: 'bar', weight: 0 },
            { type: ItemType.Field, val: 'foobar', origin: 'foobar', weight: 0 },
            { type: ItemType.Field, val: 'bar', origin: 'bar', weight: 0 },
            { type: ItemType.Operator, val: 'subtraction', origin: '-', weight: 1 },
            { type: ItemType.Operator, val: 'multiplication', origin: '*', weight: 2 },
            { type: ItemType.Operator, val: 'addition', origin: '+', weight: 1 },
            { type: ItemType.Operator, val: 'addition', origin: '+', weight: 1 },
            { type: ItemType.Field, val: 'foo', origin: 'foo', weight: 0 },
            { type: ItemType.Operator, val: 'division', origin: '/', weight: 2 }
        ])).toEqual(5);
    });
});
