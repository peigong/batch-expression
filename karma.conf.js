// Karma configuration
// Generated on Wed Mar 21 2018 17:20:35 GMT+0800 (CST)
const pkg = require('./package.json');
// const conf = require('./build/conf');
const babel = require('rollup-plugin-babel');

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '.',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        { pattern: 'test/**/*.spec.es6', watched: false }
    ],


    // list of files / patterns to exclude
    exclude: [
      '**/*.swp'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'src/**/*.es6': ['rollupBabel', 'coverage'],
        'test/**/*.spec.es6': ['rollupBabel']
    },
    rollupPreprocessor: {
        plugins: [],
        output: {
            format: 'iife',
            sourcemap: 'inline'
        }
    },
    customPreprocessors: {
        // Clones the base preprocessor, but overwrites
        // its options with those defined below...
        rollupBabel: {
            base: 'rollup',
            options: {
                // In this case, to use a different transpiler:
                plugins: [
                    babel({
                        'presets': [
                            [
                                '@babel/preset-env', {
                                    'targets': {
                                        'browsers': ['chrome >= 64']
                                    },
                                    'modules': false
                                }
                            ]
                        ]
                    })
                ]
            }
        }
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],
    coverageReporter: {
        type : 'html',
        dir : 'coverage/'
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
        // 'Chrome'
    ],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
