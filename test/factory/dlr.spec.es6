import { calculate, createCallbackByDLR } from '../../src/factory/dlr.es6';

// (#foo#+2+#bar#*(#foobar#-#bar#))/#foo#
describe('测试根据前序遍历（DLR）的表达式形式（先根遍历）计算函数', () => {
    let it;

    beforeEach(() => {
        it = { 'foo': 2, 'bar': 3, 'foobar' 5 };
        commands = {
            addition: (v1, v2) => v1 + v2,
            subtraction: (v1, v2) => v1 - v2,
            multiplication: (v1, v2) => v1 * v2,
            division : (v1, v2) => v1 / v2;
        };
        spyOn(commands, 'addition').and.callThrough();
        spyOn(commands, 'subtraction').and.callThrough();
        spyOn(commands, 'multiplication').and.callThrough();
        spyOn(commands, 'division').and.callThrough();
    });
    afterEach(() => {
        it = null;
    });

    it('基本功能', () => {
        let exec = createSimpleCallback('f o o', 'bar');
        let arr = items.map(exec);
        expect(arr[0]['f o o']).toBe('bar');
    });
});
// describe('测试根据前序遍历（DLR）的表达式形式（先根遍历）计算函数', () => {
//     let items;
// 
//     beforeEach(() => {
//         items = [
//             {
//                 'foo': 2,
//                 'bar': 3,
//                 'foobar' 5
//             }
//         ];
//     });
//     afterEach(() => {
//         items = null;
//     });
// 
//     it('基本功能', () => {
//         let exec = createSimpleCallback('f o o', 'bar');
//         let arr = items.map(exec);
//         expect(arr[0]['f o o']).toBe('bar');
//     });
// });
