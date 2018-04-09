import ItemType from '../../src/enums/item-type.es6';
import array2lrd from '../../src/parsers/array2lrd.es6';

describe('测试表达式从标准数据的数组形式转换为后根遍历（LRD）形式的处理函数', () => {
    it('基本功能 - 加减法', () => {
        // #foo#+2
        expect(array2lrd([
            { type: ItemType.Field, val: 'foo', origin: 'foo', weight: 0 },
            { type: ItemType.Operator, val: 'addition', origin: '+', weight: 1 },
            { type: ItemType.Constant, val: 2, origin: '2', weight: 0 },
        ])).toEqual([
            { type: ItemType.Field, val: 'foo', origin: 'foo', weight: 0 },
            { type: ItemType.Constant, val: 2, origin: '2', weight: 0 },
            { type: ItemType.Operator, val: 'addition', origin: '+', weight: 1 }
        ]);
        // #foo#+2+#bar#
        expect(array2lrd([
            { type: ItemType.Field, val: 'foo', origin: 'foo', weight: 0 },
            { type: ItemType.Operator, val: 'addition', origin: '+', weight: 1 },
            { type: ItemType.Constant, val: 2, origin: '2', weight: 0 },
            { type: ItemType.Operator, val: 'addition', origin: '+', weight: 1 },
            { type: ItemType.Field, val: 'bar', origin: 'bar', weight: 0 },
        ])).toEqual([
            { type: ItemType.Field, val: 'foo', origin: 'foo', weight: 0 },
            { type: ItemType.Constant, val: 2, origin: '2', weight: 0 },
            { type: ItemType.Field, val: 'bar', origin: 'bar', weight: 0 },
            { type: ItemType.Operator, val: 'addition', origin: '+', weight: 1 },
            { type: ItemType.Operator, val: 'addition', origin: '+', weight: 1 }
        ]);
        // #foo#+2+#bar#-#foobar#
        expect(array2lrd([
            { type: ItemType.Field, val: 'foo', origin: 'foo', weight: 0 },
            { type: ItemType.Operator, val: 'addition', origin: '+', weight: 1 },
            { type: ItemType.Constant, val: 2, origin: '2', weight: 0 },
            { type: ItemType.Operator, val: 'addition', origin: '+', weight: 1 },
            { type: ItemType.Field, val: 'bar', origin: 'bar', weight: 0 },
            { type: ItemType.Operator, val: 'subtraction', origin: '-', weight: 1 },
            { type: ItemType.Field, val: 'foobar', origin: 'foobar', weight: 0 }
        ])).toEqual([
            { type: ItemType.Field, val: 'foo', origin: 'foo', weight: 0 },
            { type: ItemType.Constant, val: 2, origin: '2', weight: 0 },
            { type: ItemType.Field, val: 'bar', origin: 'bar', weight: 0 },
            { type: ItemType.Field, val: 'foobar', origin: 'foobar', weight: 0 },
            { type: ItemType.Operator, val: 'subtraction', origin: '-', weight: 1 },
            { type: ItemType.Operator, val: 'addition', origin: '+', weight: 1 },
            { type: ItemType.Operator, val: 'addition', origin: '+', weight: 1 }
        ]);
    });
    it('基本功能 - 加减乘除', () => {
        // #foo#+2*#bar#-#foobar#
        expect(array2lrd([
            { type: ItemType.Field, val: 'foo', origin: 'foo', weight: 0 },
            { type: ItemType.Operator, val: 'addition', origin: '+', weight: 1 },
            { type: ItemType.Constant, val: 2, origin: '2', weight: 0 },
            { type: ItemType.Operator, val: 'multiplication', origin: '*', weight: 2 },
            { type: ItemType.Field, val: 'bar', origin: 'bar', weight: 0 },
            { type: ItemType.Operator, val: 'subtraction', origin: '-', weight: 1 },
            { type: ItemType.Field, val: 'foobar', origin: 'foobar', weight: 0 }
        ])).toEqual([
            { type: ItemType.Field, val: 'foo', origin: 'foo', weight: 0 },
            { type: ItemType.Constant, val: 2, origin: '2', weight: 0 },
            { type: ItemType.Field, val: 'bar', origin: 'bar', weight: 0 },
            { type: ItemType.Operator, val: 'multiplication', origin: '*', weight: 2 },
            { type: ItemType.Field, val: 'foobar', origin: 'foobar', weight: 0 },
            { type: ItemType.Operator, val: 'subtraction', origin: '-', weight: 1 },
            { type: ItemType.Operator, val: 'addition', origin: '+', weight: 1 }
        ]);
        // #foo#+2*#bar#/#foobar#
        expect(array2lrd([
            { type: ItemType.Field, val: 'foo', origin: 'foo', weight: 0 },
            { type: ItemType.Operator, val: 'addition', origin: '+', weight: 1 },
            { type: ItemType.Constant, val: 2, origin: '2', weight: 0 },
            { type: ItemType.Operator, val: 'multiplication', origin: '*', weight: 2 },
            { type: ItemType.Field, val: 'bar', origin: 'bar', weight: 0 },
            { type: ItemType.Operator, val: 'division', origin: '/', weight: 2 },
            { type: ItemType.Field, val: 'foobar', origin: 'foobar', weight: 0 }
        ])).toEqual([
            { type: ItemType.Field, val: 'foo', origin: 'foo', weight: 0 },
            { type: ItemType.Constant, val: 2, origin: '2', weight: 0 },
            { type: ItemType.Field, val: 'bar', origin: 'bar', weight: 0 },
            { type: ItemType.Field, val: 'foobar', origin: 'foobar', weight: 0 },
            { type: ItemType.Operator, val: 'division', origin: '/', weight: 2 },
            { type: ItemType.Operator, val: 'multiplication', origin: '*', weight: 2 },
            { type: ItemType.Operator, val: 'addition', origin: '+', weight: 1 }
        ]);
        // #foo#+2-#bar#/#foobar#
        expect(array2lrd([
            { type: ItemType.Field, val: 'foo', origin: 'foo', weight: 0 },
            { type: ItemType.Operator, val: 'addition', origin: '+', weight: 1 },
            { type: ItemType.Constant, val: 2, origin: '2', weight: 0 },
            { type: ItemType.Operator, val: 'subtraction', origin: '-', weight: 1 },
            { type: ItemType.Field, val: 'bar', origin: 'bar', weight: 0 },
            { type: ItemType.Operator, val: 'division', origin: '/', weight: 2 },
            { type: ItemType.Field, val: 'foobar', origin: 'foobar', weight: 0 }
        ])).toEqual([
            { type: ItemType.Field, val: 'foo', origin: 'foo', weight: 0 },
            { type: ItemType.Constant, val: 2, origin: '2', weight: 0 },
            { type: ItemType.Field, val: 'bar', origin: 'bar', weight: 0 },
            { type: ItemType.Field, val: 'foobar', origin: 'foobar', weight: 0 },
            { type: ItemType.Operator, val: 'division', origin: '/', weight: 2 },
            { type: ItemType.Operator, val: 'subtraction', origin: '-', weight: 1 },
            { type: ItemType.Operator, val: 'addition', origin: '+', weight: 1 }
        ]);
    });
    it('基本功能 - 带括号的加减乘除', () => {
        // #(foo#+2)*(#bar#-#foobar#)
        expect(array2lrd([
            { type: ItemType.Operator, val: '(', origin: '(', weight: -1 },
            { type: ItemType.Field, val: 'foo', origin: 'foo', weight: 0 },
            { type: ItemType.Operator, val: 'addition', origin: '+', weight: 1 },
            { type: ItemType.Constant, val: 2, origin: '2', weight: 0 },
            { type: ItemType.Operator, val: ')', origin: ')', weight: -1 },
            { type: ItemType.Operator, val: 'multiplication', origin: '*', weight: 2 },
            { type: ItemType.Operator, val: '(', origin: '(', weight: -1 },
            { type: ItemType.Field, val: 'bar', origin: 'bar', weight: 0 },
            { type: ItemType.Operator, val: 'subtraction', origin: '-', weight: 1 },
            { type: ItemType.Field, val: 'foobar', origin: 'foobar', weight: 0 },
            { type: ItemType.Operator, val: ')', origin: ')', weight: -1 }
        ])).toEqual([
            { type: ItemType.Field, val: 'foo', origin: 'foo', weight: 0 },
            { type: ItemType.Constant, val: 2, origin: '2', weight: 0 },
            { type: ItemType.Operator, val: 'addition', origin: '+', weight: 1 },
            { type: ItemType.Field, val: 'bar', origin: 'bar', weight: 0 },
            { type: ItemType.Field, val: 'foobar', origin: 'foobar', weight: 0 },
            { type: ItemType.Operator, val: 'subtraction', origin: '-', weight: 1 },
            { type: ItemType.Operator, val: 'multiplication', origin: '*', weight: 2 }
        ]);
        // (#foo#+2)*#bar#/#foobar#
        expect(array2lrd([
            { type: ItemType.Operator, val: '(', origin: '(', weight: -1 },
            { type: ItemType.Field, val: 'foo', origin: 'foo', weight: 0 },
            { type: ItemType.Operator, val: 'addition', origin: '+', weight: 1 },
            { type: ItemType.Constant, val: 2, origin: '2', weight: 0 },
            { type: ItemType.Operator, val: ')', origin: ')', weight: -1 },
            { type: ItemType.Operator, val: 'multiplication', origin: '*', weight: 2 },
            { type: ItemType.Field, val: 'bar', origin: 'bar', weight: 0 },
            { type: ItemType.Operator, val: 'division', origin: '/', weight: 2 },
            { type: ItemType.Field, val: 'foobar', origin: 'foobar', weight: 0 }
        ])).toEqual([
            { type: ItemType.Field, val: 'foo', origin: 'foo', weight: 0 },
            { type: ItemType.Constant, val: 2, origin: '2', weight: 0 },
            { type: ItemType.Operator, val: 'addition', origin: '+', weight: 1 },
            { type: ItemType.Field, val: 'bar', origin: 'bar', weight: 0 },
            { type: ItemType.Field, val: 'foobar', origin: 'foobar', weight: 0 },
            { type: ItemType.Operator, val: 'division', origin: '/', weight: 2 },
            { type: ItemType.Operator, val: 'multiplication', origin: '*', weight: 2 }
        ]);
        // #foo#+(2-#bar#)/#foobar#
        expect(array2lrd([
            { type: ItemType.Field, val: 'foo', origin: 'foo', weight: 0 },
            { type: ItemType.Operator, val: 'addition', origin: '+', weight: 1 },
            { type: ItemType.Operator, val: '(', origin: '(', weight: -1 },
            { type: ItemType.Constant, val: 2, origin: '2', weight: 0 },
            { type: ItemType.Operator, val: 'subtraction', origin: '-', weight: 1 },
            { type: ItemType.Field, val: 'bar', origin: 'bar', weight: 0 },
            { type: ItemType.Operator, val: ')', origin: ')', weight: -1 },
            { type: ItemType.Operator, val: 'division', origin: '/', weight: 2 },
            { type: ItemType.Field, val: 'foobar', origin: 'foobar', weight: 0 }
        ])).toEqual([
            { type: ItemType.Field, val: 'foo', origin: 'foo', weight: 0 },
            { type: ItemType.Constant, val: 2, origin: '2', weight: 0 },
            { type: ItemType.Field, val: 'bar', origin: 'bar', weight: 0 },
            { type: ItemType.Operator, val: 'subtraction', origin: '-', weight: 1 },
            { type: ItemType.Field, val: 'foobar', origin: 'foobar', weight: 0 },
            { type: ItemType.Operator, val: 'division', origin: '/', weight: 2 },
            { type: ItemType.Operator, val: 'addition', origin: '+', weight: 1 }
        ]);
    });
    it('完整功能 - (#foo#+2+#bar#*(#foobar#-#bar#))/#foo#', () => {
        // (#foo#+2+#bar#*(#foobar#-#bar#))/#foo#
        expect(array2lrd([
            { type: ItemType.Operator, val: '(', origin: '(', weight: -1 },
            { type: ItemType.Field, val: 'foo', origin: 'foo', weight: 0 },
            { type: ItemType.Operator, val: 'addition', origin: '+', weight: 1 },
            { type: ItemType.Constant, val: 2, origin: '2', weight: 0 },
            { type: ItemType.Operator, val: 'addition', origin: '+', weight: 1 },
            { type: ItemType.Field, val: 'bar', origin: 'bar', weight: 0 },
            { type: ItemType.Operator, val: 'multiplication', origin: '*', weight: 2 },
            { type: ItemType.Operator, val: '(', origin: '(', weight: -1 },
            { type: ItemType.Field, val: 'foobar', origin: 'foobar', weight: 0 },
            { type: ItemType.Operator, val: 'subtraction', origin: '-', weight: 1 },
            { type: ItemType.Field, val: 'bar', origin: 'bar', weight: 0 },
            { type: ItemType.Operator, val: ')', origin: ')', weight: -1 },
            { type: ItemType.Operator, val: ')', origin: ')', weight: -1 },
            { type: ItemType.Operator, val: 'division', origin: '/', weight: 2 },
            { type: ItemType.Field, val: 'foo', origin: 'foo', weight: 0 }
        ])).toEqual([
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
        ]);
    });
});
