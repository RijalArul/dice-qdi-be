const { Room } = require('../models')
const responseData = require('../responses/data')
class RoomController {
  static async createRoom (req, res, next) {
    try {
      const { max_player, total_shake } = req.body
      const newRoom = await Room.create({
        current_player: 0,
        max_player,
        total_shake,
        user_id: req.userData.id
      })
      responseData(res, 201, 'Success Create Room', newRoom)
    } catch (err) {
      next(err)
    }
  }

  static async getRooms (req, res, next) {
    try {
      const rooms = await Room.findAll()

      responseData(res, 200, 'Get Rooms', rooms)
    } catch (err) {
      next(err)
    }
  }

  static async getRoom (req, res, next) {
    try {
      const { id } = req.params
      const room = await Room.findByPk(id)

      if (room) {
        responseData(res, 200, 'Get Room', room)
      } else {
        throw { name: 'IdNotFound', message: 'Room Not Found' }
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = RoomController
