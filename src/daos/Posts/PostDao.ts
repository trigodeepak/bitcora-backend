import {IUser} from '@entities/User'
import {IPost} from '@entities/Posts'
import {postSchema} from '@daos/schema' 


class IComment{}
// we will not add comments in post table for comments we have PostDetails

export interface IPostDao{
    getAllPostsForUser : (user : IUser) => Promise<any[] | null>;
    addPosts : (user:IUser,post:IPost) => Promise<IPost>;
    deletePosts : (user : IUser, post : IPost) => Promise<void>;
    addPostComment : (post : IPost, comment : IComment, user : IUser) => Promise<void>;
}

class PostDao implements IPostDao{

    //Do the db calls here
    public async getAllPostsForUser(user: IUser) : Promise<any[] | null>{
        console.log('Came to getAllPostsForUser ');
        const result = await postSchema.find({});
        console.log(result);
        return result;
    }

    public async addPosts(user:IUser,post:IPost):Promise<IPost>{
        console.log(post);
        //const collection: any = getCollection();
        const result = await postSchema.create(post);
        console.log(result);
        return result as unknown as IPost;
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