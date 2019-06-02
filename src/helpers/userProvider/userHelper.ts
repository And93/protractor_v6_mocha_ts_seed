import {browser} from 'protractor';
import * as request from 'request-promise';

const PORT = 13000;
const ADDRESS = `http://localhost:${PORT}`;

interface IUser {
    type: string,
    username: string,
    password: string,
    message: string
}

export const setUser = async (): Promise<IUser> => {

    const options = {
        url: `${ADDRESS}/get`,
        json: true
    };

    const response: IUser = await request(options);

    try {
        browser.params.user = response;
        console.log('Account Provider Service: Set user -', response);
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

    const response = await request(options);

    try {
        console.log('Account Provider Service: Returning -', response);
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

    const response: IUser[] = await request(options);

    try {
        console.log('Account Provider Service: List of users -', ...response);
        return response;
    } catch (error) {
        console.error(error);
    }
};
