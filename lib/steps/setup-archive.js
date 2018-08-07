const logger = require('../logger')
const datePadding = require('../date-padding')
const getSchoolInfo = require('tfk-schools-info')

module.exports = data => {
  return new Promise(async (resolve, reject) => {
    logger('info', ['setup-parts', data._id, data.agreementTemplate])
    const now = new Date()
    const schoolInfo = getSchoolInfo({organizationNumber: data.organization.replace(/\D/g, '')})[0]
    const recipient = data.dsfContactNormalized
    const contacts = data.agreementParts.map(item => ({ ReferenceNumber: item.fnr, Role: 'Mottaker' }))
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
        email: data.studentMail || '',
        phone: data.studentPhone || '',
        streetAddress: recipient.address || '',
        zipCode: recipient.zip,
        zipPlace: recipient.city,
        area: 'Telemark',
        caseContact: 'Sakspart',
        secret: data.restrictedAddress
      }
    ]

    archive.documents = [
      {
        generator: 'add-documents',
        title: 'Leieavtale elev-pc',
        unofficialTitle: `Leieavtale elev-pc - ${recipient.fullName}`,
        accessCode: '13',
        accessGroup: schoolInfo.accessGroup,
        signOff: false,
        documentCreated: now.toISOString(),
        category: 'Dokument ut',
        paragraph: 'Offl §13 jfr Fvl §13.1',
        archive: 'Saksdokument',
        status: 'J',
        responsibleEnterpriseNumber: data.organization,
        responsiblePersonRecno: '200333',
        contacts,
        file: {
          title: 'Leieavtale elev-pc.pdf',
          fileName: 'Leieavtale elev-pc.pdf',
          data: data.agreementDocumentData
        }
      }
    ]
    data.archive = archive
    resolve(data)
  })
}
