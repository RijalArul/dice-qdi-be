const userRoutes = require('./user')
const roomRutes = require('./room')
const playRoutes = require('./playdice')

const router = require('express').Router()

router.use('/users', userRoutes)
router.use('/rooms', roomRutes)
router.use('/plays', playRoutes)

module.exports = router
