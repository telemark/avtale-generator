const logger = require('../logger')
const moveToErrors = require('../move-to-errors')

module.exports = async data => {
  try {
    logger('info', ['steps', 'decide flow', data.type])
    const flow = require(`../flows/${data.type}.js`)
    const result = await flow(data)
    return result
  } catch (error) {
    logger('error', ['steps', 'decide flow', data.type, error])
    await moveToErrors(data)
    throw error
  }
}
