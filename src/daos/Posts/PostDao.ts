//Dummy to just write the code
import {IUser} from '@entities/User'
class IPost{}
class IComment{}

export interface IPostDao{
    getAllPostsForUser : (user : IUser) => Promise<IPost | null>;
    addPosts : (user:IUser,post:IPost) => Promise<void>;
    deletePosts : (user : IUser, post : IPost) => Promise<void>;
    addPostComment : (post : IPost, comment : IComment, user : IUser) => Promise<void>;
}

class PostDao implements IPostDao{
    getAllPostsForUser: (user: IUser) => Promise<IPost | null>;
    addPosts: (user: IUser, post: IPost) => Promise<void>;
    deletePosts: (user: IUser, post: IPost) => Promise<void>;
    addPostComment: (post: IPost, comment: IComment, user: IUser) => Promise<void>;

}

export default PostDao;