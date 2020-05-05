import {IUser} from '@entities/User'
import {IPost} from '@entities/Posts'
import {IComment} from '@entities/Posts'
import {postSchema} from '@daos/schema' 
import {commentSchema} from '@daos/schema'


// we will not add comments in post table for comments we have PostDetails

export interface IPostDao{
    getAllPostsForUser : (user : IUser) => Promise<any[] | null>;
    addPosts : (userId:string,post:IPost) => Promise<IPost>;
    deletePosts : (userId:string,post : IPost) => Promise<void>;
    addPostComment : (post : IPost, comment : IComment, user : IUser) => Promise<void>;
}

class PostDao implements IPostDao{

    //Do the db calls here
    public async getAllPostsForUser(user: IUser) : Promise<any[] | null>{
        console.log('Came to getAllPostsForUser ');
        const result = await postSchema.find({userId:user.id});
        console.log(result);
        return result;
    }

    public async addPosts(userId:string,post:IPost):Promise<IPost>{
        console.log(post);
        post.userId = userId;
        //const collection: any = getCollection();
        const result = await postSchema.create(post);
        console.log(result);
        return result as unknown as IPost;
    }

    public async updatePosts(post: IPost): Promise<void> {
        //Not working properly need to fix this 
        const result = await postSchema.updateOne({id:post.id},{$set:{title:post.title,content:post.content}});
        console.log(result);
        return {} as any;
    }

    public async deletePosts(userId: string,post: IPost):Promise<void>{
        console.log('Came to deletePosts ');
        if(post.userId === userId){
            const result = await postSchema.deleteOne({id:post.id,userId:userId});
        }
        //Todo handle error 
        return {} as any;
    }

    public async addPostComment(post : IPost, comment : IComment, user : IUser):Promise<void>{
        console.log('Came to addPostComment ');
        comment.userId = user.id;
        comment.postId = post.id
        const result = await commentSchema.create(comment);
        console.log(result);
        return {} as any;
    }

    public async getAllCommentsForPost(post:IPost) : Promise<any[] | null>{
        console.log('Came to getAllCommentsForPost ');
        const result = await commentSchema.find({postId:post.id});
        console.log(result);
        return result;
    }

    //Todo delete comment, update comment , update post

    public async deleteComment(postId:string,comment:IComment):Promise<void>{
        console.log('Came to deletePosts ');
        if(postId === comment.id){
            const result = await postSchema.deleteOne({id:comment.id,postId:postId});
        }
        //Todo handle error 
        return {} as any;
    }

}

export default PostDao;