import Router from 'express';
import asyncErrorHandler from '../utils/asyncErrorHandler';
import verifyToken from '../middlewares/tokenValidation';
import placeController from '../controllers/placeController';

const router = Router();

router.get('/place', asyncErrorHandler(placeController.getAllPlace))
router.post('/place', verifyToken, asyncErrorHandler(placeController.createPlace))
router.patch('/place/:id', verifyToken, asyncErrorHandler(placeController.updatePlace))
router.delete('/place/:id', verifyToken, asyncErrorHandler(placeController.deleteAPlace))

export default router
