const normalizeContact = require('tfk-dsf-normalize-contact')
const filterGuardian = require('../filter-guardian')
const logger = require('../logger')
const formatSvarUtRecipient = require('../format-svarut-recipient')
const config = require('../../config')

function generateSvarutTitle (data) {
  let title = 'Avtale fra Telemark fylkeskommune'
  return title
}

module.exports = data => {
  return new Promise(async (resolve, reject) => {
    logger('info', ['setup-parts', data._id, data.agreementTemplate])
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
        kunDigitalLevering: false,
        printkonfigurasjon: {
          brevtype: config.DISTRIBUTION_LETTER_TYPE,
          fargePrint: true,
          tosidig: false
        },
        signeringUtloper: new Date(Date.now() + data.dueDays * 24 * 60 * 60 * 1000).toISOString(),
        metadataForImport: {
          dokumentetsDato: new Date(Date.now()).toISOString(),
          journalposttype: 'Dokument inn',
          journalstatus: 'J',
          saksaar: '16',
          sakssekvensnummer: '08185',
          tittel: title
        },
        svarSendesTil: {
          orgnr: '940192226',
          navn: 'Telemark fylkeskommune',
          adresse1: 'Postboks 2844',
          postnr: '3702',
          poststed: 'Skien'
        }
      }

      if (data.requireDigitalSignature) {
        distribution.signaturtype = 'AUTENTISERT_SIGNATUR'
        distribution.svarPaForsendelseLink = false
      } else {
        distribution.lenker = [
          {
            ledetekst: 'Gå til avtaleportalen for å godkjenne eller avslå avtalen',
            urlLenke: 'https://avtaler.t-fk.no',
            urlTekst: 'avtaler.t-fk.no'
          }
        ]
      }
      if (data.requiresGuardianSignature !== false) {
        const parents = filterGuardian(data.dsf)
        logger('info', ['setup-parts', data._id, 'requiresGuardianSignature', parents.length])
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
