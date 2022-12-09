const router = require('express').Router()
const UserController = require('../controllers/user')
const { errorHandler } = require('../middlewares/error_handler')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.use(errorHandler)

module.exports = router
