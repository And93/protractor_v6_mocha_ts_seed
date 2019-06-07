import * as express from 'express';
import {IUser, USERS} from './userData';
import {PORT} from './userHelper';

const app = express();

app.get('/all', (_request, response) => response.send(USERS));

app.get('/get', (_request, response) => {
    const account = USERS.pop();
    // tslint:disable-next-line:no-console
    console.log('Account Provider Service: Providing User:\n', account, '\n');
    return response.send(account);
});

app.get('/return', (_request, response) => {
    const query = _request.query;

    if (!query.username) {
        throw Error('Please, set correct params to the /return call');
    }

    const account: IUser = {
        type: query.type,
        username: query.username,
        password: query.password,
        message: query.message
    };

    USERS.push(account);
    // tslint:disable-next-line:no-console
    console.log('Account Provider Service: User Returned:\n', account, '\n');
    return response.send(account);
});

// tslint:disable-next-line:no-console
export const start = () => app.listen(PORT, () => console.log(`Server is listening on the ${PORT} port.`));
