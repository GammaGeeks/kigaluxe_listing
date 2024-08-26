import multer from 'multer'
import Router from 'express';
import asyncErrorHandler from '../utils/asyncErrorHandler';
import propertiesController from '../controllers/propertiesController';
import verifyToken from '../middlewares/tokenValidation';

const router = Router();
const storage = multer.memoryStorage()
const upload = multer({ storage })

router.get('/properties', asyncErrorHandler(propertiesController.getProperties))
router.post('/properties', verifyToken, asyncErrorHandler(propertiesController.postProperties))
router.put('/properties/:id', verifyToken, asyncErrorHandler(propertiesController.updateProperty))
router.delete('/properties/:id', verifyToken, asyncErrorHandler(propertiesController.deletePropertyRoute))
router.post('/properties/img/:id', verifyToken, upload.array('avatar'), asyncErrorHandler(propertiesController.property_img))

export default router
