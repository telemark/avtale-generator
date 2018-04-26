const getTemplate = require('avtale-templates')
const capitalize = require('capitalize')
const datePadding = require('../date-padding')
const logger = require('../logger')

const generateTitle = (item, notPublic) => {
  let title = []
  title.push(capitalize(item.type))
  title.push(item.category)

  return title.join(' - ')
}

module.exports = data => {
  return new Promise((resolve, reject) => {
    logger('info', ['prepare-document', data._id, data.type])
    const now = new Date()
    const date = datePadding(now.getDate()) + '.' + datePadding(now.getMonth() + 1) + '.' + now.getFullYear()
    const template = getTemplate(data.type)
    data.dueDays = template.dueDays
    data.requireDigitalSignature = template.requireDigitalSignature
    data.document = {
      title: generateTitle(data, true),
      offTitle: generateTitle(data),
      data: {
        dato: date
      },
      templateId: data.type,
      template: template.filePath,
      type: data.type,
      recipients: []
    }
    data.documentTemplate = data.type
    resolve(data)
  })
}
