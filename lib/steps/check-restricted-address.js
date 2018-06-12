const isHemmelig = require('tfk-is-hemmelig-adresse')
const logger = require('../logger')

module.exports = data => {
  return new Promise(async (resolve, reject) => {
    logger('info', ['check-restricted-address', data._id])

    if (data.sendToDistribution === true) {
      if (data.dsfError) {
        logger('info', ['check-restricted-address', data._id, 'skipped due to dsfError'])
      } else {
        const restrictedDsf = isHemmelig(data.dsfContact)
        const restricted360 = data.p360Contact ? isHemmelig(data.p360Contact) : false

        const gotRestrictedAddress = restricted360 || restrictedDsf

        logger('info', ['check-restricted-address', data._id, 'gotRestrictedAddress', gotRestrictedAddress])

        data.restrictedAddress = gotRestrictedAddress

        data.sendToDistribution = !gotRestrictedAddress
      }
    } else {
      logger('info', ['check-restricted-address', data._id, 'skipped due to no distribution'])
    }
    resolve(data)
  })
}
