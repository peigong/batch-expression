import { trim } from '../../src/preprocessors/trim.es6';

describe('测试清除两端空白预处理函数', () => {
    it('基本功能', () => {
        expect(trim(' foo   ')).toBe('foo');
    });
});
