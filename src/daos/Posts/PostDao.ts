import {IUser} from '@entities/User'
import {IPost} from '@entities/Posts'

class IComment{}
// we will not add comments in post table for comments we have PostDetails

export interface IPostDao{
    getAllPostsForUser : (user : IUser) => Promise<IPost[] | null>;
    addPosts : (user:IUser,post:IPost) => Promise<void>;
    deletePosts : (user : IUser, post : IPost) => Promise<void>;
    addPostComment : (post : IPost, comment : IComment, user : IUser) => Promise<void>;
}

class PostDao implements IPostDao{

    //Do the db calls here 
    public async getAllPostsForUser(user: IUser) : Promise<IPost[] | null>{
        console.log('Came to getAllPostsForUser ');
        return [] as any;
    }

    public async addPosts(user:IUser,post:IPost):Promise<void>{
        console.log('Came to addPosts ');
        return {} as any;
    }

    public async deletePosts(user: IUser,post: IPost):Promise<void>{
        console.log('Came to deletePosts ');
        return {} as any;
    }

    public async addPostComment(post : IPost, comment : IComment, user : IUser):Promise<void>{
        console.log('Came to addPostComment ');
        return {} as any;
    }

}

export default PostDao;