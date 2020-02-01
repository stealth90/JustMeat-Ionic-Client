export interface NewUser {
    username: string;
    password: string;
    name: string;
    surname: string;
    address: string;
    phone: string;
    email: string;
}
export interface User extends NewUser {
    id: string;
}