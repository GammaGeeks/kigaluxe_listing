import Router from 'express';
import multer from 'multer'
import asyncErrorHandler from '../utils/asyncErrorHandler';
import verifyToken from '../middlewares/tokenValidation';
import placeController from '../controllers/placeController';

const router = Router();
const storage = multer.memoryStorage()
const upload = multer({ storage })

router.get('/places', asyncErrorHandler(placeController.getAllPlace))
router.post('/place', verifyToken, asyncErrorHandler(placeController.createPlace))
router.post('/place/img/:id', verifyToken, upload.array('avatar'), asyncErrorHandler(placeController.addPlaceImg))
router.patch('/place/:id', verifyToken, asyncErrorHandler(placeController.updatePlace))
router.delete('/place/:id', verifyToken, asyncErrorHandler(placeController.deleteAPlace))

export default router
