import {Config} from 'protractor';
import {start} from './src/helpers/userProvider/server';
import {returnUser, setUser} from './src/helpers/userProvider/userHelper';
import {TIMEOUT} from './src/helpers/timeoutHelper';
import {getCurrentSessionId, waitVideo} from './src/helpers/videoHelper';

const isSelenoid: boolean = false;
const isParallel: boolean = false;

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

    beforeLaunch: () => start(),

    onPrepare: async () => {
        await setUser();
        return getCurrentSessionId();
    },

    onComplete: () => returnUser(),
};

if (isSelenoid) {
    config.seleniumAddress = 'http://localhost:4444/wd/hub';

    config.capabilities.enableLog = true;
    config.capabilities.enableVideo = true;
    config.capabilities.enableVNC = true;
    config.onCleanUp = () => waitVideo();
}
