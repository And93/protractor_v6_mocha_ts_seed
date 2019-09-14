import * as express from 'express';
import {Server} from 'http';
import {Request, Response} from 'express-serve-static-core';
import {IUser, USERS} from './userData';

export const PORT = 13000;
export const ADDRESS = `http://localhost:${PORT}`;

const app: express.Express = express();

const time = () => `[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}]`;

app.get('/all', (_request: Request, response: Response): Response => response.send(USERS));

app.get('/get', (_request: Request, response: Response): Response => {
    const account = USERS.pop();
    console.log(`${time()} I/UserServer - Provided user: ${JSON.stringify(account)}`);
    return response.send(account);
});

app.get('/return', (request: Request, response: Response): Response => {
    const {query} = request;

    if (!query.username) {
        throw Error('Please, set correct params to the /return call');
    }

    const {type, username, password, message} = query;

    const account: IUser = {
        type,
        username,
        password,
        message
    };

    USERS.push(account);
    console.log(`${time()} I/UserServer - Returned user: ${JSON.stringify(account)}`);
    return response.send(account);
});

export const start = (): Server => app.listen(PORT, () => console.log(`${time()} I/UserServer - Listening on the ${PORT} port.`));
