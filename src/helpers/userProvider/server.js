const express = require('express');

const app = express();
const PORT = 13000;

const USERS = [
    {
        type: 'type_1',
        username: 'username_1',
        password: 'password_1',
        message: 'message_1'
    },
    {
        type: 'type_2',
        username: 'username_2',
        password: 'password_2',
        message: 'message_2'
    },
    {
        type: 'type_3',
        username: 'username_3',
        password: 'password_3',
        message: 'message_3'
    },
    {
        type: 'type_4',
        username: 'username_4',
        password: 'password_4',
        message: 'message_4'
    }
];

module.exports = () => {

    app.get('/all', (_request, response) => response.send(USERS));

    app.get('/get', (_request, response) => {
        const account = JSON.stringify(USERS.pop());
        console.log('Account Provider Service: Providing User -', account);
        return response.send(account);
    });

    app.get('/return', (_request, response) => {
        const query = _request.query;

        if (!query.username) {
            throw Error('Please, set correct params to the /return call');
        }

        const account = {
            type: query.type,
            username: query.username,
            password: query.password,
            message: query.message
        };

        USERS.push(account);
        console.log('Account Provider Service: User Returned -', JSON.stringify(account));
        return response.send(JSON.stringify(account));
    });

    app.listen(
        PORT,
        err => {
            if (err) {
                return console.error('something bad happened', err)
            }
            console.log(`Server is listening on the ${PORT} port.`)
        }
    );
};
