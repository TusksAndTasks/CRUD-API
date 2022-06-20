export interface IUserData{
    id: string;
    username: string;
    age: number;
    hobbies: Array<string | undefined>
}

export interface IReqBody{
    username: string;
    age: number;
    hobbies: Array<string | undefined>
}

export interface IMessage{
    message: string;
}