class UserController {
  static async register (req, res) {
    try {
      res.send('MASUK')
    } catch (err) {
      res.send(err)
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
