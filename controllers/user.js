const { User } = require('../models')
const responseUser = require('../responses/user')
class UserController {
  static async register (req, res, next) {
    try {
      const { username, password } = req.body
      const newUser = await User.create({
        username: username,
        password: password
      })
      responseUser(res, 200, 'Success Register', newUser)
    } catch (err) {
      next(err)
    }
  }

  static async login (req, res) {
    try {
      res.send('Login')
    } catch (err) {
      res.send(err)
    }
  }
}

module.exports = UserController
