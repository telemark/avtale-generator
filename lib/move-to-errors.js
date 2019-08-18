const { rename, access, mkdir } = require('fs').promises
const logger = require('./logger')
const config = require('../config')

module.exports = async data => {
  try {
    logger('info', ['move-to-errors', `${config.QUEUE_DIRECTORY_PATH}/${data._id}.json`])
    if (!(await access(`${config.QUEUE_DIRECTORY_PATH}/${data._id}.json`))) {
      await mkdir(`${config.ERRORS_DIRECTORY_PATH}/${data.type}`, { recursive: true })
      await rename(
        `${config.QUEUE_DIRECTORY_PATH}/${data._id}.json`,
        `${config.ERRORS_DIRECTORY_PATH}/${data.type}/${data._id}.json`
      )
    } else {
      logger('error', ['move-to-errors', data._id, 'couldn\'t find file'])
    }
  } catch (error) {
    logger('error', ['move-to-errors', data._id, 'error', error])
    throw error
  }
  logger('info', ['move-to-errors', data._id, 'moved successfully'])
}
