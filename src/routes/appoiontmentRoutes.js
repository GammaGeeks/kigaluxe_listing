import Router from 'express';
import asyncErrorHandler from '../utils/asyncErrorHandler';
import appointmentController from '../controllers/appointmentController';
import verifyToken from '../middlewares/tokenValidation';

const router = Router();

router.get('/appointment', asyncErrorHandler(appointmentController.getAllAppointments))
router.post('/appointment', asyncErrorHandler(appointmentController.postAppointment))
router.put('/appointment/:id', verifyToken, asyncErrorHandler(appointmentController.updateAppointment))
router.delete('/appointment/:id', verifyToken, asyncErrorHandler(appointmentController.deleteAppointment))

export default router
