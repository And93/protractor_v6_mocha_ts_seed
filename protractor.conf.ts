import {Config} from 'protractor';
import {start} from './src/helpers/userProvider/server';
import {returnUser, setUser} from './src/helpers/userProvider/userHelper';
import {TIMEOUT} from './src/helpers/timeoutHelper';
import {getCurrentSessionId, waitVideo} from './src/helpers/videoHelper';
import yargs = require('yargs');

const {argv} = yargs
    .boolean('selenoid')
    .number('parallel')
    .string('reporter')
    .default('selenoid', false)
    .default('parallel', 1)
    .default('reporter', 'spec');

const reporter = argv.reporter;
const isSelenoid = argv.selenoid;
const threadCount = argv.parallel;

export const config: Config = {

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
        shardTestFiles: threadCount > 1,
        maxInstances: threadCount,
    },

    framework: 'mocha',

    mochaOpts: {
        ui: 'bdd',
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

    plugins: [{
        package: 'protractor-puppeteer-plugin',
        configFile: './puppeteer.conf.json'
    }],

    beforeLaunch: () => start(),

    onPrepare: async () => {
        await setUser();
        return getCurrentSessionId();
    },

    onComplete: () => returnUser(),
};

if (isSelenoid) {
    config.seleniumAddress = 'http://localhost:4444/wd/hub';

    Object.assign(
        config.capabilities,
        {
            'selenoid:options': {
                enableLog: true,
                enableVideo: true,
                enableVNC: true
            }
        }
    );

    config.onCleanUp = () => waitVideo();
}

if (reporter === 'allure') {
    config.mochaOpts.reporter = 'allure-mocha';
} else if (reporter === 'reportportal') {
    config.mochaOpts = {
        reporter: 'mocha-rp-reporter',
        reporterOptions: {
            configFile: './reportportal.conf.json'
        }
    }
} else {
    config.mochaOpts.reporter = 'spec';
}
