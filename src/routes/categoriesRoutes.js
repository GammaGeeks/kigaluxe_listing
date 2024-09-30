import Router from 'express';
import multer from 'multer'
import asyncErrorHandler from '../utils/asyncErrorHandler';
import verifyToken from '../middlewares/tokenValidation';
import categoriesController from '../controllers/categoriesController';

const router = Router();
const storage = multer.memoryStorage()
const upload = multer({ storage })

router.get('/categories', asyncErrorHandler(categoriesController.getAllCategories))
router.post('/categories', asyncErrorHandler(categoriesController.postCategory))
router.delete('/categories/:id', asyncErrorHandler(categoriesController.deleteCategory))

export default router
