import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';

import { paramMissingError } from '@shared/constants';
import { IPost } from '@entities/Posts';
import PostDao from '@daos/Posts/PostDao';

// Init shared
const router = Router();
const postDao = new PostDao();

router.get('/postId/:postId', async (req: Request, res: Response) => {
    const { postId } = req.params as ParamsDictionary;
    if (!postId) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    const post = await postDao.getPostById(postId);
    return res.status(OK).json(post);
});

router.get('/userId/:userId', async (req: Request, res: Response) => {
    const { userId } = req.params as ParamsDictionary;
    if (!userId) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    const posts = await postDao.getAllPostsForUser(userId);
    return res.status(OK).json({posts});
});

router.get('/userId/:userId/postId/:postId', async (req: Request, res: Response) => {
    const { userId,postId } = req.params as ParamsDictionary;
    if (!userId || !postId) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    const posts = await postDao.getPostForUser(userId,postId);
    return res.status(OK).json({posts});
});

router.get('/allPosts', async (req: Request, res: Response) => {
    const posts = await postDao.getAllPosts();
    return res.status(OK).json(posts);
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

router.put('/update', async (req: Request, res: Response) => {
    const { post } = req.body;
    if (!post) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    await postDao.updatePosts(post);
    return res.status(OK).end();
});


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

router.post('/allcomments', async (req: Request, res: Response) => {
    const { post } = req.body;
    console.log("All comments")
    console.log(req.body)
    if (!post) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    
    const comments = await postDao.getAllCommentsForPost(post);
    return res.status(OK).json({comments});
});

router.post('/like', async (req: Request, res: Response) => {
    const { user } = req.body;
    const { post } = req.body;
    const { like } = req.body;
    if (!user || !post) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    await postDao.addPostLike(post,like,user);
    return res.status(OK).end();
});

export default router;
