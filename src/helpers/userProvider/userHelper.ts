import {browser} from 'protractor';
import * as request from 'request-promise-native';
import {IUser} from './userData';
import {ADDRESS} from './server';

const time = () => `[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}]`;

export const setUser = async (): Promise<IUser> => {

    const options = {
        url: `${ADDRESS}/get`,
        json: true
    };

    try {
        const response: IUser = await request(options);

        Object.assign(browser.params.user, response);
        console.log(`${time()} I/UserService - Set user: ${JSON.stringify(response)}`);
        return response;
    } catch (error) {
        console.error(error)
    }
};

export const returnUser = async (userObject: IUser = browser.params.user): Promise<IUser> => {

    const options = {
        url: `${ADDRESS}/return`,
        qs: userObject,
        json: true
    };

    try {
        const response = await request(options);
        console.log(`${time()} I/UserService - Returned user: ${JSON.stringify(response)}`);
        return response;
    } catch (error) {
        console.error(error)
    }
};

export const getUsersList = async (): Promise<IUser[]> => {
    const options = {
        url: `${ADDRESS}/all`,
        json: true
    };

    try {
        const response: IUser[] = await request(options);
        console.log(`${time()} I/UserService - List of all users:: ${JSON.stringify(response)}`);
        return response;
    } catch (error) {
        console.error(error);
    }
};
