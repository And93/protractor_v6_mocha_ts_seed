import {Config} from 'protractor';
import {start} from './src/helpers/userProvider/server';
import {returnUser, setUser} from './src/helpers/userProvider/userHelper';
import {TIMEOUT} from './src/helpers/timeoutHelper';
import {getCurrentSessionId, waitVideo} from './src/helpers/videoHelper';
import yargs = require('yargs');

const {argv} = yargs
    .boolean('selenoid')
    .boolean('parallel')
    .string('reporter')
    .default('selenoid', false)
    .default('parallel', false)
    .default('reporter', 'spec');

const reporter = argv.reporter;
const isSelenoid = argv.selenoid;
const isParallel = argv.parallel;

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
        shardTestFiles: isParallel,
        maxInstances: isParallel ? 3 : 1,
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

    beforeLaunch: () => start(),

    onPrepare: async () => {
        await setUser();
        return getCurrentSessionId();
    },

    onComplete: () => returnUser(),
};

if (isSelenoid) {
    config.seleniumAddress = 'http://localhost:4444/wd/hub';

    config.capabilities = Object.assign(
        {},
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

if (reporter === 'mocha') {
    config.mochaOpts.reporter = 'allure-mocha';
} else if (reporter === 'reportportal') {
    config.mochaOpts.reporter = 'mocha-rp-reporter';
    config.mochaOpts.reporterOptions = {
        // configFile: 'path to config.json', or uncomment this string.
        configOptions: {
            token: '306ba368-412b-4d32-b8a0-51aad0dab24b',
            endpoint: 'http://localhost:8080/api/v1',
            launch: 'Example_launch',
            project: 'protractor_v6_mocha_ts_seed',
            mode: 'DEFAULT',
            debug: false,
            description: 'Launch description text',
            tags: [],
        }
    }
} else {
    config.mochaOpts.reporter = 'spec';
}
