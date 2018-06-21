const unwrapContact = require('tfk-dsf-unwrap-contact')
const normalizeContact = require('tfk-dsf-normalize-contact')
const config = require('../../config')
const getData = require('../get-data')
const logger = require('../logger')

const getMethod = data => {
  const requireGuardians = data.requireGuardianSignature || data.requireGuardianConsent
  return requireGuardians ? 'hentForeldre' : 'hentDetaljer'
}

module.exports = data => {
  return new Promise(async (resolve, reject) => {
    let dsfData = false
    logger('info', ['lookup-dsf', data._id])
    const method = getMethod(data)
    logger('info', ['lookup-dsf', data._id])
    const options = {
      url: `${config.DSF_SERVICE_URL}/${method}`,
      secret: config.DSF_JWT_SECRET,
      payload: {
        saksref: 'avtale-generator',
        foedselsnr: data.personalId
      }
    }
    dsfData = await getData(options)

    if (dsfData !== false) {
      logger('info', ['lookup-dsf', data._id, 'success'])
      const dsfContact = unwrapContact(dsfData)
      const dsf = dsfData.RESULT
      data.dsfContact = dsfContact
      data.dsfContactNormalized = normalizeContact(dsfContact)
      data.dsf = dsf
    } else {
      logger('error', ['lookup-dsf', data._id])
      data.dsf = false
      data.errors.push(new Error('DSF lookup failed'))
    }

    resolve(data)
  })
}
