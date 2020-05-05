import {IUser} from '@entities/User';
import mongoose = require("mongoose");

export interface IPost{
    id: string;
    title: string;
    subTitle: string;
    content:string;
    userId: string;
}

export class Post implements IPost {

    public id: string;
    public userId: string;
    public title: string;
    public subTitle: string;
    public content:string;

    constructor(post: string | IPost, title: string, id: string,content:string, userId: string, subTitle?: string ) {
        if (typeof post === 'string') {
            this.id = id;
            this.title = title;
            this.subTitle = subTitle || '';
            this.content = content;
            this.userId = userId;
        } else {
            this.id = post.id;
            this.title = post.title;
            this.subTitle = post.subTitle || '';
            this.content = post.content;
            this.userId = userId;
        }
    }
}

export interface IComment{
    id:string
    postId : string //Of the post on which this is posted
    userId : string //Of the posting user 
    text : string
}

export class Comment implements IComment{
    public id: string;
    public postId : string ;
    public userId : string ;
    public text : string ; 

    constructor(id:string, postId: string,userId: string,text:string){
        this.id = id;
        this.postId = postId;
        this.userId = userId;
        this.text = text;
    }

}