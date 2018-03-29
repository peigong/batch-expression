import ItemType from '../../src/enums/item-type.es6';
import array2dlr from '../../src/parsers/array2dlr.es6';

describe('测试表达式从标准数据的数组形式转换为前序遍历（DLR）的表达式形式（先根遍历）处理函数', () => {
    it('基本功能', () => {
        expect('ok').toBe('ok');
        // (#foo#+2+#bar#*(#foobar#-#bar#))/#foo#
        // expect(array2dlr([
        //     { type: ItemType.Operator, val: '(', origin: '(' },
        //     { type: ItemType.Field, val: 'foo', origin: 'foo' },
        //     { type: ItemType.Operator, val: 'addition', origin: '+' },
        //     { type: ItemType.Constant, val: 2, origin: '2' },
        //     { type: ItemType.Operator, val: 'addition', origin: '+' },
        //     { type: ItemType.Field, val: 'bar', origin: 'bar' },
        //     { type: ItemType.Operator, val: 'multiplication', origin: '*' },
        //     { type: ItemType.Operator, val: '(', origin: '(' },
        //     { type: ItemType.Field, val: 'foobar', origin: 'foobar' },
        //     { type: ItemType.Operator, val: 'subtraction', origin: '-' },
        //     { type: ItemType.Field, val: 'bar', origin: 'bar' },
        //     { type: ItemType.Operator, val: ')', origin: ')' },
        //     { type: ItemType.Operator, val: ')', origin: ')' },
        //     { type: ItemType.Operator, val: 'division', origin: '/' },
        //     { type: ItemType.Field, val: 'foo', origin: 'foo' }
        // ])).toEqual([
        //     { type: ItemType.Operator, val: 'division', origin: '/' },
        //     { type: ItemType.Operator, val: 'addition', origin: '+' },
        //     { type: ItemType.Operator, val: 'addition', origin: '+' },
        //     { type: ItemType.Field, val: 'foo', origin: 'foo' },
        //     { type: ItemType.Constant, val: 2, origin: '2' },
        //     { type: ItemType.Operator, val: 'multiplication', origin: '*' },
        //     { type: ItemType.Field, val: 'bar', origin: 'bar' },
        //     { type: ItemType.Operator, val: 'subtraction', origin: '-' },
        //     { type: ItemType.Field, val: 'foobar', origin: 'foobar' },
        //     { type: ItemType.Field, val: 'bar', origin: 'bar' },
        //     { type: ItemType.Field, val: 'foo', origin: 'foo' }
        // ]);
    });
});
