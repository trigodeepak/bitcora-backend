import User, { IUser } from '@entities/User'
import { IPost } from '@entities/Posts'
import PostDao from '@daos/Posts/PostDao'
<<<<<<< HEAD
import {IComment} from '@entities/Posts'
=======


// class IComment { }
>>>>>>> c9e4fa3378cb80ba6f813ddecab9ba7ca446ef03

const postDao = new PostDao();

//Not using this now

export interface Iservice {
    getAllPostsForUser: (user: IUser) => Promise<IPost[]| null>;
<<<<<<< HEAD
    addPosts: (userId: string, post: IPost) => Promise<IPost>;
    deletePosts: (userId: string, post: IPost) => Promise<void>;
    addPostComment: (post: IPost, comment: IComment, user: IUser) => Promise<void>;
=======
    addPosts: (user: IUser, post: IPost) => Promise<void>;
    deletePosts: (user: IUser, post: IPost) => Promise<void>;
    // addPostComment: (post: IPost, comment: IComment, user: IUser) => Promise<void>;
>>>>>>> c9e4fa3378cb80ba6f813ddecab9ba7ca446ef03
}

class Service implements Iservice {

    public async getAllPostsForUser(user: IUser): Promise<IPost[] | null> {
<<<<<<< HEAD
        const posts = await postDao.getAllPostsForUser(user);
        return posts;
=======
        const posts = await postDao.getAllPostsForUser(user)
            .then((data: any) => {
                return data;
            }).catch((err: any) => {
                const error = new Error('Post details are not fetched');
                throw error;
            })
        return {} as any;
>>>>>>> c9e4fa3378cb80ba6f813ddecab9ba7ca446ef03
    }

    public async addPosts(userId: string, post: IPost) :Promise<IPost> {
        const posts = await postDao.addPosts(userId,post);
        return posts;
    }

    public async deletePosts(userId: string, post: IPost):Promise<void> {
        const posts = await postDao.deletePosts(userId,post);            
        return {} as any;
    }

<<<<<<< HEAD
    public async addPostComment(post: IPost, comment: IComment, user: IUser):Promise<void>{
        const posts = await postDao.addPostComment(post,comment,user)
        return {} as any;
    }
=======
    // public async addPostComment(post: IPost, comment: IComment, user: IUser):Promise<void>{
    //     const posts = await postDao.addPostComment(post,comment,user)
    //         .then((data: any) => {
    //             return data;
    //         }).catch((err: any) => {
    //             let error = new Error("Post comment is not added properly");
    //             throw error;
    //         })
    //     return {} as any;
    // }
>>>>>>> c9e4fa3378cb80ba6f813ddecab9ba7ca446ef03

}

export default Service;
