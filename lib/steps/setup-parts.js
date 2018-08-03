const normalizeContact = require('tfk-dsf-normalize-contact')
const generateSvarutTitle = require('tfk-generate-svarut-title')
const getTemplate = require('avtale-templates')
const filterGuardian = require('../filter-guardian')
const logger = require('../logger')
const formatSvarUtRecipient = require('../format-svarut-recipient')
const config = require('../../config')

module.exports = data => {
  return new Promise(async (resolve, reject) => {
    logger('info', ['setup-parts', data._id, data.agreementTemplate])
    const template = getTemplate(data.agreementTemplate)
    if (data.dsf !== false) {
      const title = generateSvarutTitle(data)
      let recipients = [
        normalizeContact(data.dsf.HOV)
      ]
      let distribution = {
        tittel: title,
        avgivendeSystem: config.DISTRIBUTION_SYSTEM,
        konteringskode: config.DISTRIBUTION_CODE,
        krevNiva4Innlogging: false,
        kryptert: false,
        kunDigitalLevering: template.distribution.kunDigitalLevering,
        signaturtype: 'AUTENTISERT_SIGNATUR',
        svarPaForsendelseLink: false,
        printkonfigurasjon: {
          brevtype: config.DISTRIBUTION_LETTER_TYPE,
          fargePrint: true,
          tosidig: false
        },
        signeringUtloper: new Date(Date.now() + data.dueDays * 24 * 60 * 60 * 1000).toISOString(),
        svarSendesTil: {
          orgnr: '940192226',
          navn: 'Telemark fylkeskommune',
          adresse1: 'Postboks 2844',
          postnr: '3702',
          poststed: 'Skien'
        }
      }
      const caseNumberSplit = data.p360Elevmappe && data.p360Elevmappe !== false ? data.p360Elevmappe.CaseNumber.split('/') : false
      distribution.metadataFraAvleverendeSystem = {
        dokumentetsDato: new Date(Date.now()).toISOString(),
        journalaar: null,
        journaldato: new Date(Date.now()).toISOString(),
        journalpostnummer: null,
        journalposttype: null,
        journalsekvensnummer: null,
        journalstatus: 'J',
        saksaar: caseNumberSplit ? caseNumberSplit[0] : null,
        sakssekvensnummer: caseNumberSplit ? caseNumberSplit[1] : null,
        tittel: `{type: '(TFK-SIGN)', 'accessGroup': 'TFK-elev'}`
      }

      if (template.distribution.lenker) {
        distribution.lenker = template.distribution.lenker
      }

      if (data.requireDigitalSignature === false) {
        delete distribution['signaturtype']
        delete distribution['signeringUtloper']
      } else {
        distribution.forsendelseType = config.DISTRIBUTION_SIGNATURE_FORSENDELSETYPE
      }

      if (data.requireGuardianSignature !== false || data.requireGuardianConsent !== false) {
        const parents = filterGuardian(data.dsf)
        logger('info', ['setup-parts', data._id, 'requireGuardianSignature or requireGuardianConsent', parents.length])
        const normalized = parents.map(normalizeContact)
        data.recipientCopies = normalized
        data.guardiansFound = normalized.length
        data.recipientCopies.forEach(recipient => recipients.push(recipient))
      } else {
        logger('info', ['setup-parts', data._id, 'requiresGuardianSignature', false])
      }
      data.distribution = distribution
      data.agreementParts = recipients.map(formatSvarUtRecipient)
    } else {
      logger('error', ['setup-parts', data._id, 'missing dsf data'])
    }
    resolve(data)
  })
}
