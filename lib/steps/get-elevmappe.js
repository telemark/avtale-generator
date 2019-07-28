const p360 = require('p360')
const logger = require('../logger')
const config = require('../../config')
const p360Options = {
  user: config.P360_USER,
  password: config.P360_PASSWORD,
  baseUrl: config.P360_URL,
  options: {
    ignoredNamespaces: true
  }
}

module.exports = async data => {
  logger('info', ['get-elevmappe', data._id])
  if (!data.p360Elevmappe) {
    logger('info', ['get-elevmappe', data._id, 'looking up'])
    const clientService = 'CaseService'
    const clientMethod = 'GetCases'
    const args = {
      parameter: {
        ContactReferenceNumber: data.personalId,
        Title: 'Elevmappe'
      }
    }
    const options = {
      p360: p360Options,
      clientService: clientService,
      clientMethod: clientMethod,
      args: args
    }
    try {
      const p360Elevmappe = await p360(options)
      if (p360Elevmappe.GetCasesResult && p360Elevmappe.GetCasesResult.Successful === true) {
        if (p360Elevmappe.GetCasesResult.Cases && p360Elevmappe.GetCasesResult.Cases.CaseResult && p360Elevmappe.GetCasesResult.Cases.CaseResult.length > 0) {
          const elevmappe = p360Elevmappe.GetCasesResult.Cases.CaseResult[0]
          data.p360Elevmappe = {
            CaseNumber: elevmappe.CaseNumber,
            Recno: elevmappe.Recno
          }
        } else {
          data.p360Elevmappe = false
        }
      } else {
        data.p360Elevmappe = false
      }
      logger('info', ['get-elevmappe', data._id, 'lookup complete'])
    } catch (error) {
      logger('error', ['get-elevmappe', data._id, 'lookup failed', JSON.stringify(error)])
      data.errors.push(JSON.stringify(error))
    }
  } else {
    logger('info', ['get-elevmappe', data._id, 'elevmappe data existed', 'new lookup unnecessary'])
  }
  return data
}
