import {IUser} from '@entities/User';
import mongoose = require("mongoose");

export interface IPost{
    id: number;
    title: string;
    subTitle: string;
    content:string;
    user: IUser;
}

class Post implements IPost {

    public id: number;
    public user: IUser;
    public title: string;
    public subTitle: string;
    public content:string;

    constructor(post: string | IPost, title: string, id: number,content:string, user: IUser, subTitle?: string ) {
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