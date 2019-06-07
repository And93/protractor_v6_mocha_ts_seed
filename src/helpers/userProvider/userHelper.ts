import {browser} from 'protractor';
import * as request from 'request-promise-native';
import {IUser} from './userData';

export const PORT = 13000;
export const ADDRESS = `http://localhost:${PORT}`;

export const setUser = async (): Promise<IUser> => {

    const options = {
        url: `${ADDRESS}/get`,
        json: true
    };

    try {
        const response: IUser = await request(options);

        browser.params.user = response;
        // tslint:disable-next-line:no-console
        console.log('Account Provider Service: Set user:\n', response, '\n');
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

        // tslint:disable-next-line:no-console
        console.log('Account Provider Service: Returning:\n', response, '\n');
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

        // tslint:disable-next-line:no-console
        console.log('Account Provider Service: List of users:\n', ...response, '\n');
        return response;
    } catch (error) {
        console.error(error);
    }
};
