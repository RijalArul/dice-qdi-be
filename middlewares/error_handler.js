function errorHandler (err, req, res, next) {
  let code = err.code || 500

  if (
    err.name === 'SequelizeValidationError' ||
    err.name === 'SequelizeUniqueConstraintError'
  ) {
    code = 400
    message = err.errors.map(el => {
      return el.message
    })
  } else if (err.name === 'InvalidEmailOrPassword') {
    code = 401
    message = err.name
  } else if (err.name === 'ForbiddenAccess') {
    code = 403
    message = 'Forbidden Access'
  } else if (err.name === 'IdNotFound') {
    code = 404
    message = err.name
  } else if (err.name === 'UserNotFound') {
    code = 404
    message = err.name
  } else {
    message = 'InternalServerError'
  }

  res.status(code).json({
    message: message
  })
}

module.exports = {
  errorHandler
}
