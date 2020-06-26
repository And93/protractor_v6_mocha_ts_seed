import {browser} from 'protractor';
import * as request from 'request-promise-native';
import {IUser} from './userData';
import {ADDRESS} from './server';

const logMsg = (prefix: 'I' | 'E') => {
    const date = new Date();
    return `[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}] ${prefix}/UserService - PID: ${process.pid}.`
};

export const setUser = async (): Promise<IUser> => {

    const options = {
        url: `${ADDRESS}/get`,
        json: true
    };

    try {
        const response: IUser = await request(options);

        Object.assign(browser.params.user, response);
        // tslint:disable-next-line:no-console
        console.log(`${logMsg('I')} Set user: ${response.username}`);
        return response;
    } catch (error) {
        throw new Error(`${logMsg('E')} Error during 'setUser' function execution: ${error}`);
    }
};

export const returnUser = async (userObject: IUser = browser.params.user): Promise<IUser> => {

    const options = {
        url: `${ADDRESS}/return`,
        qs: userObject,
        json: true
    };

    try {
        const response: IUser = await request(options);
        // tslint:disable-next-line:no-console
        console.log(`${logMsg('I')} Returned user: ${response.username}`);
        return response;
    } catch (error) {
        throw new Error(`${logMsg('E')} Error during 'returnUser' function execution: ${error}`);
    }
};

export const getUsersList = async (): Promise<IUser[]> => {
    const options = {
        url: `${ADDRESS}/all`,
        json: true
    };

    try {
        const response: IUser[] = await request(options);
        // tslint:disable-next-line:no-console
        console.log(`${logMsg('I')} List of all users:: ${JSON.stringify(response)}`);
        return response;
    } catch (error) {
        throw new Error(`${logMsg('E')} Error during 'getUsersList' function execution: ${error}`);
    }
};
