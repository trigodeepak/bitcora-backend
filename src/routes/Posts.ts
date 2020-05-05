import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';

import { paramMissingError } from '@shared/constants';
import { IPost } from '@entities/Posts';
import PostDao from '@daos/Posts/PostDao';

// Init shared
const router = Router();
const postDao = new PostDao();


router.get('/all', async (req: Request, res: Response) => {
    const { user } = req.body;
    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    const posts = await postDao.getAllPostsForUser(user);
    return res.status(OK).json({posts});
});

router.post('/add', async (req: Request, res: Response) => {
    const { user } = req.body;
    const { post } = req.body;
    if (!user || !post) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    const posts = await postDao.addPosts(user.id,post);
    return res.status(CREATED).json({posts});
});

//Make an api to update post 

router.delete('/delete', async (req: Request, res: Response) => {
    const { user } = req.body;
    const { post } = req.body;
    if (!user || !post) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    await postDao.deletePosts(user.id,post);
    return res.status(OK).end();
});

router.post('/addcomment', async (req: Request, res: Response) => {
    const { user } = req.body;
    const { post } = req.body;
    const { comment } = req.body;
    if (!user || !post) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    await postDao.addPostComment(post,comment,user);
    return res.status(OK).end();
});

router.get('/allcomments', async (req: Request, res: Response) => {
    const { post } = req.body;
    if (!post) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    const comments = await postDao.getAllCommentsForPost(post);
    return res.status(OK).json({comments});
});

export default router;
