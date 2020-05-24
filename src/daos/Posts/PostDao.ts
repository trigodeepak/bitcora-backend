import {IUser} from '@entities/User'
import {IPost, AuditInfo} from '@entities/Posts'
import {IComment} from '@entities/Posts'
import {ILike} from '@entities/Posts'
import {postSchema} from '@daos/schema'
import {commentSchema} from '@daos/schema'
import {likeSchema} from '@daos/schema'

// we will not add comments in post table for comments we have PostDetails

export interface IPostDao {
    getPostById: (postId: string) => Promise<any | null>;
    getAllPostsForUser: (userId: string) => Promise<any[] | null>;
    getAllPosts: () => Promise<any[] | null>;
    getPostForUser: (userId: string, postId: string) => Promise<any[] | null>;
    addPosts: (userId: string, post: IPost) => Promise<IPost>;
    deletePosts: (userId: string, post: IPost) => Promise<void>;
    addPostComment: (post: IPost, comment: IComment, user: IUser) => Promise<void>;
}

class PostDao implements IPostDao {

    public async getPostById(postId: string): Promise<any | null> {
        const result = await postSchema.find({_id: postId});
        console.log(result);
        return result[0];
    }

    public async getAllPostsForUser(userId: string): Promise<any[] | null> {
        console.log('Came to getAllPostsForUser ');
        const result = await postSchema.find({userId: userId});
        console.log(result);
        return result;
    }

    public async getPostForUser(userId: string, postId: string): Promise<any | null> {
        console.log('Came to getAllPostsForUser ');
        const result = await postSchema.find({_id: postId, userId: userId});
        console.log(result);
        return result[0];
    }

    public async getAllPosts(): Promise<any[] | null> {
        console.log('Came to getAllPosts ');
        const result = await postSchema.find();
        console.log(result);
        return result;
    }

    public async addPosts(userId: string, post: IPost): Promise<IPost> {
        console.log(post);
        post.userId = userId;
        //Adding the audit info
        const auditObj = new AuditInfo(userId, new Date().toString(), "", "");
        post.auditInfo = auditObj;
        const result = await postSchema.create(post);
        console.log(result);
        return result as unknown as IPost;
    }

    public async updatePosts(post: IPost): Promise<void> {
        const result = await postSchema.updateOne({_id: post.id}, {
            $set: {
                title: post.title,
                content: post.content,
                'auditInfo.updatedBy': post.userId,
                'auditInfo.updatedOn': new Date().toString()
            }
        });
        console.log(result);
        return {} as any;
    }

    public async deletePosts(userId: string, post: IPost): Promise<void> {
        console.log('Came to deletePosts ');
        if (post.userId === userId) {
            try {
                const result = await postSchema.deleteOne({id: post.id, userId: userId});
            } catch (exp) {
                console.log("Error while updating " + exp);
            }

        }
        return {} as any;
    }

    public async addPostLike(post: IPost, like: ILike, user: IUser): Promise<void> {

        like.userId = user.id;
        like.postId = post.id
        like.like = 1;
        like.auditInfo = new AuditInfo(user.id, new Date().toString(), "", "");
        await likeSchema.create(like);
        let likeDoc = await likeSchema.find({postId : post.id});
        let likeSche = likeDoc as unknown as ILike;
        if(likeSche){
            let totalLikes = likeSche.like;
            likeSche.like = totalLikes+1;
            const result = await likeSchema.update({postId : post.id},{$set : {like : totalLikes +1}});
        }
        else{
            const result = await likeSchema.create(like);
        }

        return {} as any;
    }

    public async addPostComment(post: IPost, comment: IComment, user: IUser): Promise<void> {
        console.log('Came to addPostComment ');
        comment.userId = user.id;
        comment.postId = post.id
        comment.auditInfo = new AuditInfo(user.id, new Date().toString(), "", "");
        const result = await commentSchema.create(comment);
        console.log(result);
        return {} as any;
    }

    public async getAllCommentsForPost(post: IPost): Promise<any[] | null> {
        console.log('Came to getAllCommentsForPost ');
        const result = commentSchema.aggregate([
            {
                $match: {
                    postId: post.id
                }
            },
            {
                $project: {
                    userId: {
                        $toObjectId: "$userId"
                    },
                    text: 1
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'UserDetails'
                }
            }]);

        console.log(result);
        return result;
    }

    //Todo update comment

    public async deleteComment(postId: string, comment: IComment): Promise<void> {
        console.log('Came to deletePosts ');
        if (postId === comment.id) {
            const result = await postSchema.deleteOne({id: comment.id, postId: postId});
        }
        //Todo handle error 
        return {} as any;
    }

}

export default PostDao;