import {IUser} from '@entities/User'
import {IPosts} from '@entities/Posts'
// we will not add comments in post table for comments we have PostDetails

export interface IPostDao{
    getAllPostsForUser : (user : IUser) => Promise<IPosts | null>;
    addPosts : (user:IUser,post:IPosts) => Promise<void>;
    deletePosts : (user : IUser, post : IPosts) => Promise<void>;
}

class PostDao implements IPostDao{
    getAllPostsForUser: (user: IUser) => Promise<IPosts | null>;
    addPosts: (user: IUser, post: IPosts) => Promise<void>;
    deletePosts: (user: IUser, post: IPosts) => Promise<void>;
    addPostComment: (post: IPosts, comment: IComment, user: IUser) => Promise<void>;

}

export default PostDao;