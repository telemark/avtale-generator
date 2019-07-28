const generateDocument = require('generate-docx')
const logger = require('./logger')

function getTemplateName (input) {
  return input ? input.toString().split('/').slice(-1)[0] : false
}

module.exports = async document => {
  logger('info', ['generate-document-data', 'template', getTemplateName(document.template)])

  const options = {
    template: {
      filePath: document.template,
      data: document.data
    }
  }

  const buffer = await generateDocument(options)

  logger('info', ['generate-document-data', 'document generated'])

  return buffer.toString('base64')
}
