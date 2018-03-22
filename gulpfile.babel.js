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

const cfgKarma = config.parseConfig(path.resolve('./karma.conf.js'));
function test(done){
    // runner.run(cfgKarma, (exitCode) => {
    //     done();
    //     process.exit(exitCode);
    // });

    new Server(cfgKarma, (exitCode) => {
        done();
        process.exit(exitCode);
    }).start();
}
export { test };

const build = gulp.series(clean, gulp.parallel(rollup.build), test);

export { build };
export default build;


