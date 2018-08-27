const getKorData = require('../get-kor-data')
const logger = require('../logger')

module.exports = async data => {
  logger('info', ['lookup-kor', data._id, 'start'])
  await Promise.all(data.agreementParts.map(async part => Object.assign({}, part, {kor: part.fnr ? await getKorData(part.fnr) : true})))
  logger('info', ['lookup-kor', data._id, 'success'])
  return data
}
