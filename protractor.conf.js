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
        'src/**/*.ts'
    ],

    capabilities: {
        browserName: 'chrome',
        loggingPrefs: {
            driver: 'ALL',
            server: 'ALL',
            browser: 'ALL'
        }
    },

    framework: 'mocha',

    mochaOpts: {
        ui: 'bdd',
        reporter: 'spec',
        timeout: TIMEOUT.xl * 5,
        slow: TIMEOUT.xl * 4
    }
};
