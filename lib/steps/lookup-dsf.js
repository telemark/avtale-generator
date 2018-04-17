const unwrapContact = require('tfk-dsf-unwrap-contact')
const config = require('../../config')
const getData = require('../get-data')
const logger = require('../logger')

const getMethod = data => {
  return data.requiresGuardianSignature ? 'hentForeldre' : 'hentDetaljer'
}

module.exports = data => {
  return new Promise(async (resolve, reject) => {
    let dsfData = false
    logger('info', ['lookup-dsf', data._id])
    const method = getMethod(data)
    logger('info', ['lookup-dsf', data._id])
    const options = {
      url: config.DSF_SERVICE_URL,
      secret: config.DSF_JWT_SECRET,
      payload: {
        method: method,
        query: {
          saksref: 'minelev',
          foedselsnr: data.personalId
        }
      }
    }
    dsfData = await getData(options)

    if (dsfData !== false) {
      logger('info', ['lookup-dsf', data._id, 'success'])
      const dsfContact = unwrapContact(dsfData)
      const dsf = dsfData.RESULT
      data.dsfContact = dsfContact
      data.dsf = dsf
    } else {
      logger('error', ['lookup-dsf', data._id, data.studentUserName])
      data.dsf = false
      data.errors.push(new Error('DSF lookup failed'))
    }

    resolve(data)
  })
}
