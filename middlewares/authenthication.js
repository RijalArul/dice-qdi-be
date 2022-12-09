const jwt = require('jsonwebtoken')
const { User } = require('../models')

async function checkAuthentication (req, res, next) {
  try {
    const payload = jwt.verify(
      req.headers.access_token,
      process.env.JWT_SECRET_KEY
    )
    const userData = await User.findOne({
      where: {
        username: payload.username
      }
    })
    if (!userData) {
      throw { name: 'UserNotFound' }
    } else {
      req.userData = {
        id: userData.id,
        username: userData.username
      }
      next()
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  checkAuthentication
}
