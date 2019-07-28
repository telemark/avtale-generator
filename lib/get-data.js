const axios = require('axios')
const generateSystemJwt = require('./generate-system-jwt')
const logger = require('./logger')

module.exports = async options => {
  axios.defaults.headers.common['Authorization'] = generateSystemJwt(options.secret)
  logger('info', ['get-data', options.url, 'start'])
  try {
    const { data } = await axios.post(options.url, options.payload)
    logger('info', ['get-data', options.url, 'success'])
    return data
  } catch (error) {
    logger('error', ['get-data', options.url, error])
    return false
  }
}
