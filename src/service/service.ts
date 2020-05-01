import User, { IUser } from '@entities/User'
import { IPost } from '@entities/Posts'
import PostDao from '@daos/Posts/PostDao'


class IComment { }

const postDao = new PostDao();

export interface Iservice {
    getAllPostsForUser: (user: IUser) => Promise<IPost[]| null>;
    addPosts: (user: IUser, post: IPost) => Promise<IPost>;
    deletePosts: (user: IUser, post: IPost) => Promise<void>;
    addPostComment: (post: IPost, comment: IComment, user: IUser) => Promise<void>;
}

class Service implements Iservice {

    public async getAllPostsForUser(user: IUser): Promise<IPost[] | null> {
        const posts = await postDao.getAllPostsForUser(user);
        return posts;
    }

    public async addPosts(user: IUser, post: IPost) :Promise<IPost> {
        const posts = await postDao.addPosts(user,post);
        return posts;
    }

    public async deletePosts(user: IUser, post: IPost):Promise<void> {
        const posts = await postDao.deletePosts(user,post);            
        return {} as any;
    }

    public async addPostComment(post: IPost, comment: IComment, user: IUser):Promise<void>{
        const posts = await postDao.addPostComment(post,comment,user)
        return {} as any;
    }

}

export default Service;
