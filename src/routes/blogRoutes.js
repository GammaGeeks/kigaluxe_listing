import Router from 'express';
import asyncErrorHandler from '../utils/asyncErrorHandler';
import blogController from '../controllers/blogController';
import verifyToken from '../middlewares/tokenValidation';

const router = Router();

router.get('/blog', asyncErrorHandler(blogController.getAllBlogs))
router.get('/blog/:id', asyncErrorHandler(blogController.getOneBlog))
router.post('/blog', verifyToken, asyncErrorHandler(blogController.addBlog))

export default router
