import * as request from 'request-promise-native';
import {browser} from 'protractor';
import {waitUntil} from './waitHelper';
import {TIMEOUT} from './timeoutHelper';

export const getCurrentSessionId = async (): Promise<string> => {
    const session = await browser.getSession();
    const id: string = await session.getId();
    return browser.params.session.id = id;
};

export const waitVideo = (id: string = browser.params.session.id): Promise<void> => {
    const options = {
        method: 'HEAD',
        uri: `http://localhost:4444/video/${id}.mp4`
    };

    let previousLength: number;

    return waitUntil(
        async () => {
            try {
                const response = await request(options);
                const currentLength: number = +response['content-length'];
                const result = currentLength !== 0 && currentLength === previousLength;
                previousLength = currentLength;
                return result;
            } catch (e) {
                return false
            }
        },
        TIMEOUT.l,
        TIMEOUT.xs
    );
};
