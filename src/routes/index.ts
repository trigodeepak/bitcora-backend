import { Router } from 'express';
import UserRouter from './Users';
import PostRouter from './Posts'

// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UserRouter);
router.use('/posts', PostRouter);

// Export the base-router
export default router;
