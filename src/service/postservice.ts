import {IUser} from '@entities/User'
import PostDao from '@daos/Posts/PostDao'
class IPost{}
class IComment{}

const postDao = new PostDao();

export interface Iservice{
    getAllPostsForUser : (user : IUser) => Promise<IPost | null>;
    addPosts : (user:IUser,post:IPost) => Promise<void>;
    deletePosts : (user : IUser, post : IPost) => Promise<void>;
    addPostComment : (post : IPost, comment : IComment, user : IUser) => Promise<void>;
}

class service{

    public async getAllPosts(user:IUser) : Promise<IPost | null>{
        return PostDao.getAllPostsForUser(user)
        .then((data : any)=>{
            return data;
        }).catch((err : any)=>{
       let error = new Error("Post details are not fetched");
       throw error;
   })
    }

}

