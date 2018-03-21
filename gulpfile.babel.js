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
const clean = () => del([ conf.build.dest ]);

const cfg = config.parseConfig(path.resolve('./karma.conf.js'));

function test(done){
    // runner.run(cfg, (exitCode) => {
    //     process.exit(exitCode);
    //     done();
    // });

    return new Server(cfg, (exitCode) => {
        process.exit(exitCode);
        done();
    }).start();
}
export { test };

const build = gulp.series(clean, test, gulp.parallel(rollup.build));

export { build };
export default build;


