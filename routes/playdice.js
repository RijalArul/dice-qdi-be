const router = require('express').Router()
const PlayDice = require('../controllers/play_dice')
const { checkAuthentication } = require('../middlewares/authenthication')
const { errorHandler } = require('../middlewares/error_handler')

router.use(checkAuthentication)
router.post('/:roomId', PlayDice.create)
router.use(errorHandler)

module.exports = router
