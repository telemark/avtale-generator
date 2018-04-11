const logger = require('../logger')

module.exports = data => {
  return new Promise(async (resolve, reject) => {
    try {
      logger('info', ['steps', 'decide flow', data.agreementType])
      const flow = require(`../flows/${data.agreementType}.js`)
      const result = await flow(data)
      resolve(result)
    } catch (error) {
      logger('error', ['steps', 'decide flow', data.agreementType, error])
      reject(error)
    }
  })
}
