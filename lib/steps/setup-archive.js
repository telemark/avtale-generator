const logger = require('../logger')
const datePadding = require('../date-padding')
const getSchoolInfo = require('tfk-schools-info')
const slugify = require('@sindresorhus/slugify')
const getTemplate = require('document-templates')

module.exports = data => {
  return new Promise(async (resolve, reject) => {
    logger('info', ['setup-parts', data._id, data.agreementTemplate])
    const now = new Date()
    const schoolInfo = getSchoolInfo({ organizationNumber: data.organization.replace(/\D/g, '') })[0]
    const recipient = data.dsfContactNormalized
    const { kor: { kontaktinformasjon } } = data.agreementParts.find(part => part.fnr === recipient.personalIdNumber) || {}
    const template = getTemplate({ domain: 'avtaler', templateId: data.type })
    let archive = {}
    archive._id = data._id
    archive.date = `${datePadding(now.getDate())}.${datePadding(now.getMonth() + 1)}.${now.getFullYear()}`
    archive.case = {
      generator: 'elevmappe-add-case',
      title: 'Elevmappe',
      unofficialTitle: `Elevmappe - ${recipient.fullName}`,
      type: 'elevmappe',
      accessCode: '13',
      accessGroup: 'TFK-robot',
      status: 'B',
      paragraph: 'Offl §13 jfr Fvl §13.1',
      subArchive: 'Elev',
      responsibleEnterpriseRecno: '506',
      responsiblePersonRecno: '200333'
    }

    archive.contacts = [
      {
        generator: 'add-private-person',
        personalIdNumber: recipient.personalIdNumber,
        firstName: recipient.firstName,
        middleName: recipient.middleName || '',
        lastName: recipient.lastName,
        fullName: recipient.fullName,
        email: kontaktinformasjon.epostadresse || '',
        phone: kontaktinformasjon.mobiltelefonnummer || '',
        streetAddress: recipient.address || '',
        zipCode: recipient.zip,
        zipPlace: recipient.city,
        area: 'Telemark',
        caseContact: 'Sakspart',
        secret: data.restrictedAddress
      }
    ]

    const unregisteredContacts = data.agreementParts.filter(item => item.fnr !== recipient.personalIdNumber).map(item => (
      {
        Address: item.adresse1,
        ContactName: item.navn,
        ReferenceNumber: item.fnr,
        Role: 'Mottaker',
        ZipCode: item.postnr,
        ZipPlace: item.poststed
      }
    ))

    archive.documents = [
      {
        generator: 'add-documents',
        title: template.archive.Title,
        unofficialTitle: `${template.archive.Title} - ${recipient.fullName}`,
        accessCode: template.archive.AccessCode,
        accessGroup: schoolInfo.accessGroup,
        signOff: false,
        documentCreated: now.toISOString(),
        category: template.archive.Category,
        paragraph: template.archive.Paragraph,
        archive: 'Saksdokument',
        status: template.archive.Status,
        responsibleEnterpriseNumber: data.organization,
        responsiblePersonRecno: '200333',
        contacts: [
          {
            ReferenceNumber: recipient.personalIdNumber,
            Role: 'Mottaker'
          }
        ],
        unregisteredContacts,
        file: {
          title: `${slugify(data.agreementName)}.pdf`,
          fileName: `${slugify(data.agreementName)}.pdf`,
          data: data.agreementDocumentData
        }
      }
    ]

    // Distribution to parents
    if (data.missingGuardianDocumentData !== false) {
      const manuellTemplate = getTemplate('manuell')
      const manuellDocument = {
        generator: 'add-documents',
        title: `${template.name} ${manuellTemplate.archive.Title}`,
        unofficialTitle: `${template.name} ${manuellTemplate.archive.Title} - ${recipient.fullName}`,
        accessCode: manuellTemplate.archive.AccessCode,
        accessGroup: schoolInfo.accessGroup,
        signOff: false,
        documentCreated: now.toISOString(),
        category: manuellTemplate.archive.Category,
        paragraph: manuellTemplate.archive.Paragraph,
        archive: 'Saksdokument',
        status: manuellTemplate.archive.Status,
        responsibleEnterpriseNumber: data.organization,
        responsiblePersonRecno: '200333',
        contacts: [
          {
            ReferenceNumber: data.organization,
            Role: 'Mottaker'
          }
        ],
        file: {
          title: `${slugify(manuellTemplate.name)}.pdf`,
          fileName: `${slugify(manuellTemplate.name)}.pdf`,
          data: data.missingGuardianDocumentData
        }
      }
      archive.documents.push(manuellDocument)
    }

    // Does this need manual distribition?
    if (data.restrictedDocumentData !== false) {
      const restrictedTemplate = getTemplate('restricted')
      const restrictedDocument = {
        generator: 'add-documents',
        title: restrictedTemplate.archive.Title,
        unofficialTitle: `${restrictedTemplate.archive.Title} - ${recipient.fullName}`,
        accessCode: restrictedTemplate.archive.AccessCode,
        accessGroup: schoolInfo.accessGroup,
        signOff: false,
        documentCreated: now.toISOString(),
        category: restrictedTemplate.archive.Category,
        paragraph: restrictedTemplate.archive.Paragraph,
        archive: 'Saksdokument',
        status: restrictedTemplate.archive.Status,
        responsibleEnterpriseNumber: data.organization,
        responsiblePersonRecno: '200333',
        contacts: [
          {
            ReferenceNumber: data.organization,
            Role: 'Mottaker'
          }
        ],
        file: {
          title: `${slugify(restrictedTemplate.name)}.pdf`,
          fileName: `${slugify(restrictedTemplate.name)}.pdf`,
          data: data.restrictedDocumentData
        }
      }
      archive.documents.push(restrictedDocument)
    }

    data.archive = archive
    resolve(data)
  })
}
