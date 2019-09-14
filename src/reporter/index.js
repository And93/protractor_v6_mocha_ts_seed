const {reporters, Runner} = require("mocha");

const {
    EVENT_SUITE_BEGIN,
    EVENT_SUITE_END,
    EVENT_TEST_PASS,
    EVENT_TEST_FAIL,
    EVENT_TEST_BEGIN,
    EVENT_TEST_END,
    EVENT_TEST_PENDING,
    EVENT_TEST_RETRY,
    EVENT_HOOK_BEGIN,
    EVENT_HOOK_END,
    EVENT_RUN_BEGIN,
    EVENT_RUN_END,
    EVENT_DELAY_BEGIN,
    EVENT_DELAY_END
} = Runner.constants;

const general = {
    start: 0,
    finish: 0,
    timeout: 0,
    slow: 0,
    enableTimeouts: null,
    bail: null,
};

const suite = {
    start: 0,
    finish: 0,
    duration: 0,
    title: '',
    root: null,
    retries: null,
    state: '',
    beforeEach: [],
    beforeAll: [],
    afterEach: [],
    afterAll: [],
    suites: [],
    tests: [],
};

const hook = {
    start: 0,
    finish: 0,
    title: '',
    body: '',
    timedOut: null,
    pending: null,
    type: 'hook',
    file: '',
    parent: '',
    attachment: null
};

const test = {
    start: 0,
    finish: 0,
    title: '',
    body: '',
    timedOut: null,
    pending: null,
    type: 'test',
    file: '',
    parent: '',
    duration: 0,
    state: '',
    err: {
        name: '',
        message: '',
        showDiff: true,
        actual: true,
        expected: false,
        stack: ''
    },

    attachment: null

};

function reporter(runner, options) {
    let testData = [];

    reporters.Base.call(this, runner, options);

    runner.on(EVENT_RUN_BEGIN, function () {
        general.start = new Date().getTime();
        console.log('EVENT_RUN_BEGIN', general);
    });

    runner.on(EVENT_RUN_END, function () {
        general.finish = new Date().getTime();
        console.log('EVENT_RUN_END', general);
    });

    runner.on(EVENT_DELAY_BEGIN, function (delay) {
        console.log('EVENT_DELAY_BEGIN', delay);
    });

    runner.on(EVENT_DELAY_END, function (delay) {
        console.log('EVENT_DELAY_END', delay);
    });

    runner.on(EVENT_SUITE_BEGIN, function (suite) {
        if (!suite.title) {
            general.timeout = suite.timeout();
            general.slow = suite.slow();
            general.enableTimeouts = suite.enableTimeouts();
            general.bail = suite.bail();

            suite.suites.forEach(_suite => {
                const {title, pending, _retries, file, tests, _beforeEach, _beforeAll, _afterEach, _afterAll, suites, parent} = _suite;

                let _tests = [];
                let beforeEach = [];
                let beforeAll = [];
                let afterEach = [];
                let afterAll = [];

                tests.forEach(({title, body, pending, type, file}) => _tests.push({title, body, pending, type, file}));

                _beforeAll.forEach(({title, body, pending, type, file}) => beforeAll.push({title, body, pending, type, file}));
                _beforeEach.forEach(({title, body, pending, type, file}) => beforeEach.push({title, body, pending, type, file}));
                _afterEach.forEach(({title, body, pending, type, file}) => afterEach.push({title, body, pending, type, file}));
                _afterAll.forEach(({title, body, pending, type, file}) => afterAll.push({title, body, pending, type, file}));

                testData.push({title, pending, retries: _retries, file, tests: _tests, beforeEach, beforeAll, afterEach, afterAll});
            });

            console.log('EVENT_SUITE_BEGIN', suite.suites.forEach(({_beforeEach}) => _beforeEach.forEach(({parent}) => console.log(parent.title))));
        }
    });

    runner.on(EVENT_SUITE_END, function (suite) {
        // console.log('EVENT_SUITE_END', suite);
    });

    runner.on(EVENT_HOOK_BEGIN, function (hook) {
        console.log('EVENT_HOOK_BEGIN')
    });

    runner.on(EVENT_HOOK_END, function (hook) {
        console.log('EVENT_HOOK_END')
    });

    runner.on(EVENT_TEST_PASS, function (test) {
        // console.log('EVENT_TEST_PASS', test);
    });

    runner.on(EVENT_TEST_FAIL, function (test, err) {
        // console.log('EVENT_TEST_FAIL', test, '\n', err.message, '\n');
    });

    runner.on(EVENT_TEST_END, function (test) {
        // console.log('EVENT_TEST_END:runner.stats::', runner.stats, '\n');
    });

    runner.on(EVENT_TEST_BEGIN, function (test) {
        console.log('EVENT_TEST_BEGIN');
    });

    runner.on(EVENT_TEST_PENDING, function (test) {
        console.log('EVENT_TEST_PENDING');
    });

    runner.on(EVENT_TEST_RETRY, function (test) {
        console.log('EVENT_TEST_RETRY')
    });
}

module.exports = reporter;
