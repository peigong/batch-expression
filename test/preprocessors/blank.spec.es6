import blank from '../../src/preprocessors/blank.es6';

describe('测试空白预处理函数', () => {
    it('基本功能', () => {
        expect(blank('1 *  1')).toBe('1*1');
    });
});
