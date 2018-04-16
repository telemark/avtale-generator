const logger = require('../logger')

module.exports = data => {
  return new Promise(async (resolve, reject) => {
    try {
      logger('info', ['steps', 'decide flow', data.type])
      const flow = require(`../flows/${data.type}.js`)
      const result = await flow(data)
      resolve(result)
    } catch (error) {
      logger('error', ['steps', 'decide flow', data.type, error])
      reject(error)
    }
  })
}
