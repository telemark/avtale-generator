const axios = require('axios')
const generateSystemJwt = require('./generate-system-jwt')
const logger = require('./logger')

module.exports = options => {
  return new Promise(async (resolve, reject) => {
    axios.defaults.headers.common['Authorization'] = generateSystemJwt(options.secret)
    logger('info', ['get-data', options.url, 'start'])
    axios.post(options.url, options.payload)
      .then(result => {
        logger('info', ['get-data', options.url, 'success'])
        resolve(result.data)
      })
      .catch(error => {
        logger('error', ['get-data', options.url, error])
        resolve(false)
      })
  })
}
