'use strict';

require('ts-node/register');
const server = require('./src/helpers/userProvider/server');
const userProvider = require('./src/helpers/userProvider/userHelper');
const {TIMEOUT} = require('./src/helpers/timeoutHelper');
const waitVideo = require('./src/helpers/videoHelper');

const isSelenoid = false;
const isParallel = false;

const config = {

    baseUrl: 'https://angular.io/',
    directConnect: false,
    ignoreUncaughtExceptions: true,
    logLevel: 'INFO',
    getPageTimeout: TIMEOUT.xl * 3,
    allScriptsTimeout: TIMEOUT.xl * 4,

    specs: [
        './src/tests/**/*.ts'
    ],

    capabilities: {
        browserName: 'chrome',
        loggingPrefs: {
            driver: 'ALL',
            server: 'ALL',
            browser: 'ALL'
        },
        count: 1,
        shardTestFiles: isParallel,
        maxInstances: isParallel ? 3 : 1,
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
        },
        session: {
            id: ''
        }
    },

    beforeLaunch: () => server.start(),

    onPrepare: async () => {
        await userProvider.setUser();
        return waitVideo.getCurrentSessionId();
    },

    onComplete: () => userProvider.returnUser(),
};

if (isSelenoid) {
    config.seleniumAddress = 'http://localhost:4444/wd/hub';

    config.capabilities.enableLog = true;
    config.capabilities.enableVideo = true;
    config.capabilities.enableVNC = true;
    config.onCleanUp = () => waitVideo.waitVideo();
}

exports.config = config;
