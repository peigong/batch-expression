import util from '../src/util.es6';

describe('测试工具函数', () => {
    it('根据列的序号生成大写字母表示列别名', () => {
        expect(util.createColumnAlias(1)).toBe('A');
        expect(util.createColumnAlias(2)).toBe('B');
        expect(util.createColumnAlias(26)).toBe('Z');
        expect(util.createColumnAlias(26 + 1)).toBe('AA');
        expect(util.createColumnAlias(26 + 2)).toBe('AB');
        expect(util.createColumnAlias(26 + 25)).toBe('AY');
        expect(util.createColumnAlias(2 * 26)).toBe('AZ');
        expect(util.createColumnAlias(2 * 26 + 1)).toBe('BA');
        expect(util.createColumnAlias(2 * 26 + 2)).toBe('BB');
        expect(util.createColumnAlias(2 * 26 + 25)).toBe('BY');
        expect(util.createColumnAlias(3 * 26)).toBe('BZ');
        expect(util.createColumnAlias(27 * 26)).toBe('ZZ');
        expect(util.createColumnAlias(27 * 26 + 1)).toBe('AAA');
        expect(util.createColumnAlias(27 * 26 + 2)).toBe('AAB');
        expect(util.createColumnAlias(27 * 26 + 25)).toBe('AAY');
        expect(util.createColumnAlias(27 * 26 + 26)).toBe('AAZ');
    });
    it('根据列的索引生成大写字母表示列别名', () => {
        expect(util.createColumnAliasByIndex(1 - 1)).toBe('A');
        expect(util.createColumnAliasByIndex(27 * 26 + 26 - 1)).toBe('AAZ');
    });
});
