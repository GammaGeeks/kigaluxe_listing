import Router from 'express';
import asyncErrorHandler from '../utils/asyncErrorHandler';
import verifyToken from '../middlewares/tokenValidation';
import placeController from '../controllers/placeController';

const router = Router();

router.patch('/place/:id', verifyToken, asyncErrorHandler(placeController.updatePlace))

export default router
