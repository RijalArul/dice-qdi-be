const { checkPassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { User } = require('../models')
const user = require('../models/user')
const responseData = require('../responses/data')
class UserController {
  static async register (req, res, next) {
    try {
      const { username, password } = req.body
      const newUser = await User.create({
        username: username,
        password: password
      })

      const genToken = generateToken({
        id: newUser.id,
        username: newUser.username
      })
      responseData(res, 200, 'Success Register', genToken)
    } catch (err) {
      next(err)
    }
  }

  static async login (req, res, next) {
    try {
      const { username, password } = req.body
      const user = await User.findOne({
        where: {
          username: username
        }
      })

      if (user) {
        const validPass = checkPassword(password, user.password)

        if (validPass) {
          const genToken = generateToken({
            id: user.id,
            username: user.username
          })
          responseData(res, 200, 'Success Login', genToken)
        } else {
          throw { name: 'InvalidEmailOrPassword' }
        }
      } else {
        throw { name: 'UserNotFound' }
      }
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
}

module.exports = UserController
