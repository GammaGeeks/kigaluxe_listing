import express from 'express'
import asyncErrorHandler from '../utils/asyncErrorHandler'
import rateController from '../controllers/rateController'

const router = express.Router()

router.post('/rate/:propId', asyncErrorHandler(rateController.addRate))

export default router
