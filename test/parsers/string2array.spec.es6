import ItemType from '../../src/enums/item-type.es6';
import string2array from '../../src/parsers/string2array.es6';

describe('测试表达式由字符串形式转换为数组形式处理函数', () => {
    it('基本功能', () => {
        expect(string2array('#foo#+2+#bar#')).toEqual([
            { type: ItemType.Field, val: 'foo', origin: 'foo' },
            { type: ItemType.Operator, val: 'addition', origin: '+' },
            { type: ItemType.Constant, val: 2, origin: '2' },
            { type: ItemType.Operator, val: 'addition', origin: '+' },
            { type: ItemType.Field, val: 'bar', origin: 'bar' }
        ]);
        expect(string2array('(#foo#+2+#bar#*(#foobar#-#bar#))/#foo#')).toEqual([
            { type: ItemType.Operator, val: '(', origin: '(' },
            { type: ItemType.Field, val: 'foo', origin: 'foo' },
            { type: ItemType.Operator, val: 'addition', origin: '+' },
            { type: ItemType.Constant, val: 2, origin: '2' },
            { type: ItemType.Operator, val: 'addition', origin: '+' },
            { type: ItemType.Field, val: 'bar', origin: 'bar' },
            { type: ItemType.Operator, val: 'multiplication', origin: '*' },
            { type: ItemType.Operator, val: '(', origin: '(' },
            { type: ItemType.Field, val: 'foobar', origin: 'foobar' },
            { type: ItemType.Operator, val: 'subtraction', origin: '-' },
            { type: ItemType.Field, val: 'bar', origin: 'bar' },
            { type: ItemType.Operator, val: ')', origin: ')' },
            { type: ItemType.Operator, val: ')', origin: ')' },
            { type: ItemType.Operator, val: 'division', origin: '/' },
            { type: ItemType.Field, val: 'foo', origin: 'foo' }
        ]);
    });
});
