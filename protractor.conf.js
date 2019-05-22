const TIMEOUT = {
    xs: 1000,
    s: 5 * 1000,
    m: 10 * 1000,
    l: 15 * 1000,
    xl: 20 * 1000
};

require('ts-node/register');

exports.config = {

    baseUrl: 'https://angular.io/',
    directConnect: false,
    ignoreUncaughtExceptions: true,
    logLevel: 'INFO',
    getPageTimeout: TIMEOUT.xl * 3,
    allScriptsTimeout: TIMEOUT.xl * 4,

    specs: [
        './src/**/*.ts'
    ],

    capabilities: {
        browserName: 'chrome',
        loggingPrefs: {
            driver: 'ALL',
            server: 'ALL',
            browser: 'ALL'
        },
        count: 1,
        shardTestFiles: true,
        maxInstances: 2
    },

    framework: 'mocha',

    mochaOpts: {
        ui: 'bdd',
        reporter: 'spec',
        timeout: TIMEOUT.xl * 5,
        slow: TIMEOUT.xl * 4
    },

    params: {
        env: '',
        user: {
            type: '',
            username: '',
            password: '',
            message: ''
        }
    },

    beforeLaunch: () => {
        console.log('beforeLaunch'); // one times. Before test run
    },

    onPrepare: () => {
        console.log('onPrepare'); // Before each test suite.
    },

    onComplete: () => {
        console.log('onComplete'); // After each test suite.
    },

    afterLaunch: () => {
        console.log('afterLaunch'); // one times. After test run
    },
};
