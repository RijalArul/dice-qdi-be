const userRoutes = require('./user')
const roomRutes = require('./room')

const router = require('express').Router()

router.use('/users', userRoutes)
router.use('/rooms', roomRutes)

module.exports = router
