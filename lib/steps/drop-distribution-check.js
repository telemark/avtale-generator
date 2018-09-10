const getTemplate = require('avtale-templates')
const logger = require('../logger')

module.exports = async data => {
  logger('info', ['drop-distribution-check', data._id, data.agreementTemplate])
  const template = getTemplate(data.agreementTemplate)
  if (template.dropManualDistribution === true) {
    logger('info', ['drop-distribution-check', data._id, 'can be dropped - investigating'])
    if (data.dsf === false) {
      logger('info', ['drop-distribution-check', data._id, 'dsf error - distribution dropped'])
      data.dropDistribution = true
    }
    if (data.sendToDistribution === false) {
      logger('info', ['drop-distribution-check', data._id, 'sendToDistribution - false - distribution dropped'])
      data.dropDistribution = true
    }
    if (data.data.restrictedAddress === true) {
      logger('info', ['drop-distribution-check', data._id, 'restrictedAddress - true - distribution dropped'])
      data.dropDistribution = true
    }
  } else {
    logger('info', ['drop-distribution-check', data._id, 'can not be dropped - skipping check'])
  }
  return data
}
