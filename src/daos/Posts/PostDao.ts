import {IUser} from '@entities/User'
import {IPost} from '@entities/Posts'
import logger from '@shared/Logger';
// class IComment{}
// we will not add comments in post table for comments we have PostDetails

export interface IPostDao{
    getAllPostsForUser : (user : IUser) => Promise<IPost[] | null>;
    addPosts : (user:IUser,post:IPost) => Promise<void>;
    deletePosts : (user : IUser, post : IPost) => Promise<void>;
    // addPostComment : (post : IPost, comment : IComment, user : IUser) => Promise<void>;
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

    // public async addPostComment(post : IPost, comment : IComment, user : IUser):Promise<void>{
    //     console.log('Came to addPostComment ');
    //     return {} as any;
    // }

}

export default PostDao;