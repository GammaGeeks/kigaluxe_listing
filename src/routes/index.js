import Router from 'express'
// import socialAuthRoutes from './socialAuthRoutes'
import authRoutes from './authRoutes'
import propertiesRoutes from './propertiesRoutes'
import searchRoute from './searchRoute'
import blogRoutes from './blogRoutes'
import commentRoutes from './commentRoutes'
import appointmentRoutes from './appoiontmentRoutes'

const router = Router()

// router.use(socialAuthRoutes)
router.use(authRoutes)
router.use(propertiesRoutes)
// router.use(searchRoute)
router.use(blogRoutes)
// router.use(commentRoutes)
router.use(appointmentRoutes)
// router.use(shareRoutes)

export default router
