const router = require('express').Router()
const RoomController = require('../controllers/room')
const { checkAuthentication } = require('../middlewares/authenthication')
const { errorHandler } = require('../middlewares/error_handler')

router.use(checkAuthentication)
router.post('/', RoomController.createRoom)
router.get('/', RoomController.getRooms)
router.get('/:id', RoomController.getRoom)
router.use(errorHandler)

module.exports = router
