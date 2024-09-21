import Router from 'express';
import asyncErrorHandler from '../utils/asyncErrorHandler';
import searchController from '../controllers/searchController';

const router = Router();

router.get('/search', asyncErrorHandler(searchController))

export default router
