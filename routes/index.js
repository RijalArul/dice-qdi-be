const userRoutes = require('./user')

const router = require('express').Router()

router.use('/users', userRoutes)

module.exports = router
