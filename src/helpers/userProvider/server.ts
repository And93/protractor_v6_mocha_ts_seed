import * as express from 'express';
import {Server} from 'http';
import {Request, Response} from 'express-serve-static-core';

import {IUser, USERS} from './userData';

export const PORT: number = 13000;
export const ADDRESS: string = `http://localhost:${PORT}`;

const app: express.Express = express();

app.get('/all', (request: Request, response: Response): Response => response.send(USERS));

app.get('/get', (request: Request, response: Response): Response => {
    const account = USERS.pop();
    // tslint:disable-next-line:no-console
    console.log('Account Provider Service: Providing User:\n', account, '\n');
    return response.send(account);
});

app.get('/return', (request: Request, response: Response): Response => {
    const query = request.query;

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
export const start = (): Server => app.listen(PORT, () => console.log(`Server is listening on the ${PORT} port.`));
