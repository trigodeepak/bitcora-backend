import User, { IUser } from '@entities/User'
import { IPost } from '@entities/Posts'
import PostDao from '@daos/Posts/PostDao'

const postDao = new PostDao();

export interface Iservice {
    getAllPostsForUser: (user: IUser) => Promise<IPost[]| null>;
    addPosts: (user: IUser, post: IPost) => Promise<void>;
    deletePosts: (user: IUser, post: IPost) => Promise<void>;
    // addPostComment: (post: IPost, comment: IComment, user: IUser) => Promise<void>;
}

class Service implements Iservice {

    public async getAllPostsForUser(user: IUser): Promise<IPost[] | null> {
        const posts = await postDao.getAllPostsForUser(user)
            .then((data: any) => {
                return data;
            }).catch((err: any) => {
                throw new Error('Post details are not fetched');
            });
        return {} as any;
    }

    public async addPosts(user: IUser, post: IPost) :Promise<void> {
        const posts = await postDao.addPosts(user,post)
            .then((data: any) => {
                return data;
            }).catch((err: any) => {
                throw error = new Error(`${err} Post is not added correctly`);
            });
        return {} as any;
    }

    public async deletePosts(user: IUser, post: IPost):Promise<void> {
        const posts = await postDao.deletePosts(user,post)
            .then((data: any) => {
                return data;
            }).catch((err: any) => {
                throw new Error('Post is not deleted properly');
            });
        return {} as any;
    }
}

export default Service;
