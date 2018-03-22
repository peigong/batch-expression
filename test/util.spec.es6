import util from '../src/util.es6';

describe('测试工具函数', () => {
    it('根据列的索引生成大写字母表示列别名', () => {
        expect(util.createColumnAlias(0)).toBe('A');
        expect(util.createColumnAlias(1)).toBe('B');
        expect(util.createColumnAlias(25)).toBe('Z');
        expect(util.createColumnAlias(26)).toBe('AA');
        expect(util.createColumnAlias(26 + 1)).toBe('AB');
        expect(util.createColumnAlias(2 * 26 - 1)).toBe('AZ');
        expect(util.createColumnAlias(26 * 26 - 1)).toBe('ZZ');
        expect(util.createColumnAlias(26 * 26 + 1)).toBe('ZZB');
        expect(util.createColumnAlias(26 * 26 * 26 - 1)).toBe('ZZZ');
    });
});
