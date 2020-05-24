import User, { IUser } from '@entities/User'
import {ILike, IPost} from '@entities/Posts'
import PostDao from '@daos/Posts/PostDao'
import {IComment} from '@entities/Posts'

const postDao = new PostDao();

export interface Iservice {
    getAllPostsForUser: (user: IUser) => Promise<IPost[]| null>;
    getAllPosts: () => Promise<IPost[]| null>;
    addPosts: (userId: string, post: IPost) => Promise<IPost>;
    deletePosts: (userId: string, post: IPost) => Promise<void>;
    addPostComment: (post: IPost, comment: IComment, user: IUser) => Promise<void>;
    addPostLike:(post: IPost, like : ILike, user: IUser)=> Promise<void>;
}

class Service implements Iservice {

    public async getAllPostsForUser(user: IUser): Promise<IPost[] | null> {
        const posts = await postDao.getAllPostsForUser(user);
        return posts;
    }
    public async getAllPosts(): Promise<IPost[] | null> {
        const posts = await postDao.getAllPosts();
        return posts;
    }

    public async addPosts(userId: string, post: IPost) :Promise<IPost> {
        const posts = await postDao.addPosts(userId,post);
        return posts;
    }

    public async deletePosts(userId: string, post: IPost):Promise<void> {
        const posts = await postDao.deletePosts(userId,post);
        return {} as any;
    }

    public async addPostComment(post: IPost, comment: IComment, user: IUser):Promise<void>{
        const posts = await postDao.addPostComment(post,comment,user)
        return {} as any;
    }


    public async addRemovePostLike(post: IPost, like: ILike, user: IUser):Promise<void>{
        const posts = await postDao.addPostLike(post,like,user);
        return {} as any;
    }

}

export default Service;
