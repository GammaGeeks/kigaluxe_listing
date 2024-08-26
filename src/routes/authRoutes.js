import Router from 'express';
import multer from 'multer'
import asyncErrorHandler from '../utils/asyncErrorHandler';
import AuthController from '../controllers/authController';
import { passwordHashing } from '../utils/passwordHasher';
import verifyToken from '../middlewares/tokenValidation';

const router = Router();
const storage = multer.memoryStorage()
const upload = multer({ storage })

router.post('/auth/signup', passwordHashing, asyncErrorHandler(AuthController.signUp))
router.post('/auth/signin', asyncErrorHandler(AuthController.signIn))
router.get('/auth/logout', asyncErrorHandler(AuthController.logout))
router.post('/auth/profileimg', verifyToken, upload.single('avatar'), asyncErrorHandler(AuthController.profile))
router.get('/auth/profileimg', verifyToken, asyncErrorHandler(AuthController.loadProfImg))

export default router
