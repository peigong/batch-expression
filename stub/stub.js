(function(){
    var be = BatchExpression;
    var util = be.util;

    var items = [
        { foo: 2, bar: 3, foobar:5 },
        { foo: 3, bar: 4, foobar:6 },
        { foo: 4, bar: 5, foobar:7 },
        { foo: 5, bar: 6, foobar:8 },
        { foo: 6, bar: 7, foobar:9 },
        { foo: 7, bar: 8, foobar:10 }
    ];
    var heads = Object.keys(items[0]).map((it, idx) => {
        return { field: it, alias: util.createColumnAliasByIndex(idx) };
    });
    var buttons = '1,2,3,4,5,6,7,8,9,0,+,-,*,/,(,),='.split(',');

    var controller = new Vue({
        el: '#batch-expression-demo',
        data: {
            field: '',
            lrdArray: '',
            lrdSimpleArray: '',
            lrdString: '',
            expression: '',
            buttons: buttons,
            heads: heads,
            items: items
        },
        methods: {
            clean: function(){
                controller.lrdArray = '';
                controller.lrdSimpleArray = '';
                controller.lrdString = '';
                controller.expression = '';
            },
            selectBtn: function(btn){
                controller.expression += btn;
            },
            selectCol: function(it){
                controller.expression += it.alias;
            },
            calculate: function(){
                var field = controller.field;

                var expression = controller.expression;
                if('=' === expression[0]){
                    expression = heads.map((it) => {
                        return function(expression){
                            return expression.replace(new RegExp(it.alias, 'g'), `#${ it.field }#`);
                        };
                    }).reduce((expression, exec) => exec(expression), expression);

                    var exp = expression.substring(1);
                    controller.lrdString = util.convertLRDString(exp);
                    controller.lrdArray = JSON.stringify(util.convertLRDArray(exp));
                    controller.lrdSimpleArray = JSON.stringify(util.convertLRDSimpleArray(exp));
                }else{
                    controller.lrdArray = '';
                    controller.lrdSimpleArray = '';
                    controller.lrdString = '';
                }

                var fn = be.createCallback(field, expression);
                controller.items = items.map(fn);
            }
        }
    });
})();
