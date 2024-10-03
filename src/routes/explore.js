import Router from 'express';
import asyncErrorHandler from '../utils/asyncErrorHandler';
import exploreController from '../controllers/exploreController';

const router = Router();

router.get('/explore', asyncErrorHandler(exploreController))

export default router
