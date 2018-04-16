const saveFile = require('../save-file')
const logger = require('../logger')
const config = require('../../config')

module.exports = data => {
  return new Promise(async (resolve, reject) => {
    logger('info', ['save-to-distribution', data._id])
    if (data.errors.length === 0 && data.sendToDistribution === true && data.distribution) {
      logger('info', ['save-to-distribution', data._id, 'no errors', 'saving to distribution'])
      data.distribution.documents = data.documents.filter(document => document.distribution === true)
      const fileName = `${config.DISTRIBUTION_DIRECTORY_PATH}/${data._id}.json`
      await saveFile({filePath: fileName, data: data.distribution})
    } else {
      if (data.sendToDistribution === false || !data.distribution) {
        logger('info', ['save-to-distribution', data._id, 'nothing to distribute'])
      } else {
        logger('warn', ['save-to-distribution', data._id, 'errors', data.errors.length])
      }
    }
    resolve(data)
  })
}
