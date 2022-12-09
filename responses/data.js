function responseData (res, code, message, data) {
  res.status(code).json({
    message: message,
    data: data
  })
}

module.exports = responseData
