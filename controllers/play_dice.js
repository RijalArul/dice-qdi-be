const { Room, PlayDice } = require('../models')
class PlayDiceController {
  static async create (req, res, next) {
    try {
      const { roomId } = req.params
      const userId = req.userData.id
      const room = await Room.findByPk(roomId)
      if (room) {
        const randomValue = Math.floor(Math.random() * 6) + 1
        const payloadDice = {
          user_id: userId,
          room_id: room.id,
          value: randomValue,
          rest_of_shake: room.total_shake,
          rest_of_turn: room.total_shake,
          result: 'WAITING'
        }

        if (room.max_player <= room.current_player) {
          throw { name: 'SizeIsFull', message: 'Memory Room Is Full' }
        } else {
          const findDice = await PlayDice.findOne({
            where: {
              user_id: userId,
              room_id: room.id
            }
          })

          if (!findDice) {
            await Room.update(
              { current_player: room.current_player + 1 },
              {
                where: {
                  id: room.id
                },
                returning: true
              }
            )
            await PlayDice.create(payloadDice)

            res.send('Welcome to the group')
          } else {
            console.log('MASUK')
            if (room.current_player === room.max_player) {
              const newPlayDice = await PlayDice.create(payloadDice)
              res.send(newPlayDice)
            } else {
              res.send('Waiting Fulfill player')
            }
          }
        }
      } else {
        throw { name: 'IdNotFound', message: 'Room Not Found' }
      }
    } catch (err) {
      //   console.log(err)
      res.send(err)
    }
  }
}

module.exports = PlayDiceController
