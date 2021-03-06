import {TIMEOUT} from './timeoutHelper';

// tslint:disable-next-line:max-line-length
const checkCondition = (condition: () => Promise<boolean>, interval: number, timeout: number, resolve: () => any, reject: (reason?: any) => any) => {
    return condition()
        .then((value: boolean): number => {
            if (value) {
                resolve();
                return;
            }
            timeout -= interval;
            if (timeout <= 0) {
                reject(new Error('Timeout is reached.'));
                return;
            }
            return setTimeout(checkCondition, interval, condition, interval, timeout, resolve, reject);
        });
};

export const waitUntil = (condition: () => Promise<boolean>, timeout = TIMEOUT.xs, interval = 100): Promise<void> => {
    return new Promise((resolve, reject) => checkCondition(condition, interval, timeout, resolve, reject));
};
