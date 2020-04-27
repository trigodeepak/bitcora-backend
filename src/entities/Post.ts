import User from './User';

export interface IPost {
    id: number;
    title: string;
    subTitle: string;
    content:string;
    user: User;
}

class Post implements IPost {

    public id: number;
    public name: string;
    public email: string;
    public user : User;

    constructor(post: string | IPost, title: string, id: number, subTitle?: string, content:string, user: User ) {
        if (typeof post === 'string') {
            this.id = id;
            this.title = title;
            this.subTitle = subTitle || '';
            this.content = content;
            this.user = user;
        } else {
            this.id = post.id;
            this.title = post.title;
            this.subTitle = post.subTitle || '';
            this.content = post.content;
            this.user = user;
        }
    }
}

export default Post;
