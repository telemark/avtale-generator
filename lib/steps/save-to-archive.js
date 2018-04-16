const saveFile = require('../save-file')
const logger = require('../logger')
const config = require('../../config')

module.exports = data => {
  return new Promise(async (resolve, reject) => {
    logger('info', ['save-to-archive', data._id])
    if (data.errors.length === 0) {
      logger('info', ['save-to-arcive', data._id, 'no errors', 'saving to archive'])
      const fileName = `${config.ARCIVE_DIRECTORY_PATH}/${data._id}.json`
      await saveFile({filePath: fileName, data: data.archive})
    } else {
      logger('warn', ['save-to-archive', data._id, 'errors', data.errors.length])
    }
    resolve(data)
  })
}
