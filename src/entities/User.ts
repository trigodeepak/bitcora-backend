export interface IUser {
    id: string;
    name: string;
    email: string;
}

class User implements IUser {

    public id: string;
    public name: string;
    public email: string;

    constructor(nameOrUser: string | IUser, email?: string, id?: string) {
        if (typeof nameOrUser === 'string') {
            this.name = nameOrUser;
            this.email = email || '';
            this.id = id || '';
        } else {
            this.name = nameOrUser.name;
            this.email = nameOrUser.email;
            this.id = nameOrUser.id;
        }
    }
}

export default User;
