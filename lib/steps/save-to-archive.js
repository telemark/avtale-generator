const saveFile = require('../save-file')
const logger = require('../logger')
const config = require('../../config')

module.exports = async data => {
  logger('info', ['save-to-archive', data._id])
  if (data.errors.length === 0 && data.dropDistribution === false) {
    logger('info', ['save-to-archive', data._id, 'no errors', 'saving to archive'])
    const fileName = `${config.ARCHIVE_DIRECTORY_PATH}/${data._id}.json`
    await saveFile({ filePath: fileName, data: data.archive })
  } else if (data.dropDistribution === true) {
    logger('info', ['save-to-archive', data._id, 'distribution dropped'])
  } else {
    logger('warn', ['save-to-archive', data._id, 'errors', data.errors.length])
  }
  return data
}
