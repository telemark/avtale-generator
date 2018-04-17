const logger = require('../logger')
const prepareData = require('../steps/prepare-data')
const lookupDsf = require('../steps/lookup-dsf')
const saveToDone = require('../steps/save-to-done')
const saveToArchive = require('../steps/save-to-archive')
const saveToDistribution = require('../steps/save-to-distribution')
const saveToErrors = require('../steps/save-to-errors')
const removeFromQueue = require('../steps/remove-from-queue')

module.exports = data => {
  logger('info', ['flows', 'elevpc'])
  return new Promise(async (resolve, reject) => {
    prepareData(data)
      .then(lookupDsf)
      .then(saveToDone)
      .then(saveToArchive)
      .then(saveToDistribution)
      .then(saveToErrors)
      .then(removeFromQueue)
      .then(data => resolve(data))
      .catch(error => reject(error))
  })
}
