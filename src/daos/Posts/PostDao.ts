import {IUser} from '@entities/User'
import {IPost} from '@entities/Posts'
import logger from '@shared/Logger';

export interface IPostDao{
    getAllPostsForUser : (user : IUser) => Promise<IPost[] | null>;
    addPosts : (user:IUser,post:IPost) => Promise<void>;
    deletePosts : (user : IUser, post : IPost) => Promise<void>;
}

class PostDao implements IPostDao{

    // Do the db calls here
    public async getAllPostsForUser(user: IUser) : Promise<IPost[] | null>{
        logger.log('Came to getAllPostsForUser ');
        return [] as any;
    }

    public async addPosts(user:IUser,post:IPost):Promise<void>{
        logger.log('Came to addPosts ');
        return {} as any;
    }

    public async deletePosts(user: IUser,post: IPost):Promise<void>{
        logger.log('Came to deletePosts');
        return {} as any;
    }

}

export default PostDao;