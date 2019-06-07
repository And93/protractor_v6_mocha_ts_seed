export interface IUser {
    type: string,
    username: string,
    password: string,
    message: string
}

export const USERS: IUser[] = [
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
