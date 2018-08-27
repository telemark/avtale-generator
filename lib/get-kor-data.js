const config = require('../config')
const getData = require('./get-data')
const logger = require('./logger')

module.exports = async personids => {
  const options = {
    url: config.KOR_SERVICE_URL,
    secret: config.KOR_JWT_SECRET,
    payload: personids
  }
  logger('info', ['get-kor-data', 'personids', personids.length])
  try {
    const data = await getData(options)
    return data.personer
  } catch (error) {
    logger('info', ['get-kor-data', 'personids', personids.length, error])
    throw error
  }
}
