export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string; 
}

class User implements IUser {

    public id: string;
    public name: string;
    public email: string;
    public password : string; 

    constructor(nameOrUser: string | IUser, email?: string, id?: string, password?: string) {
        if (typeof nameOrUser === 'string') {
            this.name = nameOrUser;
            this.email = email || '';
            this.id = id || '';
            this.password = password || '';
        } else {
            this.name = nameOrUser.name;
            this.email = nameOrUser.email;
            this.id = nameOrUser.id;
            this.password = nameOrUser.password;
        }
    }
}

export default User;
