const { Sequelize } = require('sequelize')
const { Room, PlayDice, sequelize } = require('../models')
const responseData = require('../responses/data')

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
          rest_of_shake: room.total_shake - 1,
          rest_of_turn: 0,
          result: 'WAITING'
        }

        if (room.max_player < room.current_player) {
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
            responseData(res, 200, 'Welcome to the group', payloadDice)
          } else {
            if (room.current_player === room.max_player) {
              if (findDice.rest_of_shake > 0) {
                const getMyDice = await PlayDice.findAll({
                  where: {
                    user_id: userId,
                    room_id: room.id
                  }
                })
                const newPayload = {
                  user_id: userId,
                  room_id: room.id,
                  value: randomValue,
                  rest_of_shake: 0,
                  rest_of_turn: getMyDice[getMyDice.length - 1].rest_of_turn,
                  result: 'WAITING'
                }

                const createPlay = await PlayDice.create(newPayload)
                const allPlayDice = await PlayDice.findAll({
                  where: {
                    room_id: room.id,
                    user_id: userId
                  }
                })

                if (allPlayDice) {
                  if (newPayload.value === 1) {
                    const newNextPayload = {
                      user_id: userId,
                      room_id: room.id,
                      value: randomValue,
                      rest_of_shake: room.total_shake - getMyDice.length,
                      rest_of_turn:
                        getMyDice[getMyDice.length - 1].rest_of_turn + 1,
                      result: 'WAITING'
                    }

                    const createPlay = await PlayDice.create(newNextPayload)
                    responseData(res, 201, 'Create Dice', createPlay)
                  } else if (newPayload.value === 6) {
                    const newNextPayload = {
                      user_id: userId,
                      room_id: room.id,
                      value: randomValue,
                      rest_of_shake: room.total_shake - getMyDice.length,
                      rest_of_turn: 0,
                      result: 'WAITING'
                    }

                    const createPlay = await PlayDice.create(newNextPayload)
                    responseData(res, 201, 'Create Dice', createPlay)
                  }
                }
                responseData(res, 201, 'Create Dice', createPlay)
              }
            } else {
              responseData(
                res,
                200,
                'Waiting Fullfill member',
                'Waiting Fullfill member'
              )
            }
          }
        }
      } else {
        throw { name: 'IdNotFound', message: 'Room Not Found' }
      }
    } catch (err) {
      next(err)
    }
  }

  static async result (req, res, next) {
    try {
      const { roomId } = req.params
      const query = `
        select room_id as roomId, user_id as userId, SUM(rest_of_turn) as score 
        FROM playdices
        where room_id = ${roomId}
        group by user_id
        order by rest_of_turn desc
        limit 1
        ;`
      const dice = await sequelize.query(query)

      if (dice) {
        const dices = await PlayDice.findAll({
          where: {
            user_id: dice[0][0].userId,
            room_id: dice[0][0].roomId
          }
        })
        await PlayDice.update(
          {
            result: 'WINNERS'
          },
          {
            where: {
              room_id: dices[dices.length - 1].room_id,
              user_id: dices[dices.length - 1].user_id,
              id: dices[dices.length - 1].id
            },
            returning: true
          }
        )
        const getWinner = await PlayDice.findOne({
          where: {
            id: dices[dices.length - 1].id
          }
        })
        responseData(res, 200, 'Yeeayy Winner', getWinner)
      }
    } catch (err) {
      console.log(err)
      //   res.send(err)
    }
  }
}

module.exports = PlayDiceController
