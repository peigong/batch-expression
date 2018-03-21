import conf from './conf';
import * as rollup from 'rollup';

let options = {
    input: conf.build.es6,
    output: {
        format: 'cjs'
    }
};
options.plugins = conf.getPlugins(process.env.NODE_ENV);

function build(){
    return rollup.rollup(options)
	.then(bundle => {
        bundle.write({
            format: 'cjs',
            file: conf.build.cjs
        });
        return bundle;
	})
	.then(bundle => {
        return bundle.write({
            name: 'BatchExpression',
            format: 'iife',
            file: conf.build.iife
        });
	});
};

export default { build };
