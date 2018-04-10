import ItemType from '../../src/enums/item-type.es6';
import { lrd2string } from '../../src/parsers/lrd2string.es6';

describe('表达式从后根遍历（LRD）的形式转换成字符串', () => {
    it('完整功能 - (#foo#+2+#bar#*(#foobar#-#bar#))/#foo#', () => {
        // (#foo#+2+#bar#*(#foobar#-#bar#))/#foo#
        expect(lrd2string([
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
        ])).toEqual('#foo#2#bar##foobar##bar#-*++#foo#/');
    });
});
