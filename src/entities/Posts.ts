import {IUser} from '@entities/User';
import mongoose = require("mongoose");

export interface IPost{
    id: string;
    title: string;
    subTitle: string;
    content:string;
    userId: string;
    auditInfo : AuditInfo;
}

export class Post implements IPost {

    public id: string;
    public userId: string;
    public title: string;
    public subTitle: string;
    public content:string;
    public auditInfo: AuditInfo;

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
        this.auditInfo = new AuditInfo("","","","");
    }
    
}

export interface IComment{
    id:string
    postId : string //Of the post on which this is posted
    userId : string //Of the posting user 
    text : string
    auditInfo : AuditInfo
}

export class Comment implements IComment{
    public id: string;
    public postId : string ;
    public userId : string ;
    public text : string ; 
    public auditInfo : AuditInfo;

    constructor(id:string, postId: string,userId: string,text:string){
        this.id = id;
        this.postId = postId;
        this.userId = userId;
        this.text = text;
        this.auditInfo = new AuditInfo("","","","");
    }

}

export interface ILike {
    id: string
    postId: string
    userId: string
    like: number
    auditInfo: AuditInfo
}

export class Like implements ILike {
    public id: string;
    public postId: string;
    public userId: string;
    public like: number;
    public auditInfo: AuditInfo;

    constructor(id: string, postId: string, userId: string, like: number) {
        this.id = id;
        this.postId = postId;
        this.userId = userId;
        this.like = like;
        this.auditInfo = new AuditInfo("", "", "", "");
    }

}

export class AuditInfo{
    public createdBy: string ; 
    public createdOn: string ; 
    public updatedBy: string ; 
    public updatedOn: string ; 

    constructor(createdBy:string, createdOn:string,updatedBy:string,updatedOn:string){
        this.createdBy = createdBy;
        this.createdOn = createdOn;
        this.updatedBy = updatedBy;
        this.updatedOn = updatedOn;
    }



}