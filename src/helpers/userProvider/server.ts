import * as express from 'express';
import {Server} from 'http';
import {Request, Response} from 'express-serve-static-core';
import {IUser, USERS} from './userData';

export const PORT = 13000;
export const ADDRESS = `http://localhost:${PORT}`;

const app: express.Express = express();

const logMsg = (prefix: 'I' | 'E') => {
    const date = new Date();
    return `[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}] ${prefix}/UserServer -`
};

app.get('/all', (_request: Request, response: Response): Response => response.send(USERS));

app.get('/get', (_request: Request, response: Response): Response => {
    const account = USERS.pop();
    console.log(`${logMsg('I')} Provided user: ${account.username}`);
    return response.send(account);
});

app.get('/return', (request: Request, response: Response): Response => {
    const {query} = request;

    if (!query.username) {
        throw new Error(`${logMsg('E')} Please, set correct params to the "/return" call. Current: ${query}`);
    }

    const {type, username, password, message} = query;

    const account: IUser = {
        type,
        username,
        password,
        message
    };

    USERS.push(account);
    console.log(`${logMsg('I')} Returned user: ${account.username}`);
    return response.send(account);
});

export const start = (): Server => app.listen(PORT, () => console.log(`${logMsg('I')} Listening on the ${PORT} port.`));
