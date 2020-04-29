import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';

import { paramMissingError } from '@shared/constants';
import Service from '@service/service'
import Post from '@entities/Posts';

// Init shared
const router = Router();
const service = new Service();


router.get('/all', async (req: Request, res: Response) => {
    const { user } = req.body;
    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    const posts = await service.getAllPostsForUser(user);
    return res.status(OK).json({posts});
});

router.post('/add', async (req: Request, res: Response) => {
    const { userPost } = req.body;
    if (!userPost) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    const user = userPost.user;
    const post = userPost.post;
    await service.addPosts(user,post);
    return res.status(CREATED).end();
});

router.delete('/delete', async (req: Request, res: Response) => {
    const { userPost } = req.body;
    if (!userPost) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    const user = userPost.user;
    const post = userPost.post;
    await service.deletePosts(user,post);
    return res.status(OK).end();
});

router.put('/update', async (req: Request, res: Response) => {
    const { commentUser } = req.body;
    if (!commentUser) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    const user = commentUser.user;
    const post = commentUser.post;
    const comment = commentUser.comment;
    await service.addPostComment(post,comment,user);
    return res.status(OK).end();
});

export default router;
