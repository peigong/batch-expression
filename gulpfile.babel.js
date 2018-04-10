import path from 'path';
import del from 'del';
import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';

import { Server, runner, config } from 'karma';

import conf from './build/conf';
import rollup from './build/rollup.js';
import pkg from './package.json';

const $ = loadPlugins();

const error = console.error.bind( console ); // eslint-disable-line no-console
const clean = () => del([ conf.build.dest, conf.build.tmp ]);

function stub(){
    return gulp.src(['./node_modules/vue/dist/vue.js'])
    .pipe(gulp.dest(conf.build.tmp));
}
export { stub };

const cfgKarma = config.parseConfig(path.resolve('./karma.conf.js'));
function test(done){
    new Server(cfgKarma, (exitCode) => {
        done();
        process.exit(exitCode);
    }).start();
}
export { test };

const build = gulp.series(clean, gulp.parallel(stub, rollup.build));

export { build };
export default build;


