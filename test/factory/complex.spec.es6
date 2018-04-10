import { createComplexCallback } from '../../src/factory/complex.es6';

describe('根据赋值字符串创建简单赋值回调函数', () => {
    it('完整功能 - (#foo#+2+#bar#*(#foobar#-#bar#))/#foo#', () => {
        // (#foo#+2+#bar#*(#foobar#-#bar#))/#foo#
        let items = [
            { 'foo': 2, 'bar': 3, 'foobar': 5, 'test': 0 },
            { 'foo': 2, 'bar': 3, 'foobar': 5, 'test': 0 }
        ];
        let fn = createComplexCallback('test', '(#foo#+2+#bar#*(#foobar#-#bar#))/#foo#');
        let result = items.map(fn);
        expect(result[0].test).toEqual(5);
        expect(result[1].test).toEqual(5);
    });
});
