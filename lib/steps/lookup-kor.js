const getKorData = require('../get-kor-data')
const logger = require('../logger')

module.exports = async data => {
  const partsWithFnr = data.agreementParts.filter(part => part.fnr)
  logger('info', ['lookup-kor', data._id, 'parts', partsWithFnr.length])
  const ids = partsWithFnr.map(part => part.fnr)
  logger('info', ['lookup-kor', data._id, 'getKorData', 'start'])
  const kors = ids.length > 0 ? await getKorData(ids) : []
  logger('info', ['lookup-kor', data._id, 'getKorData', 'kors', kors.length, 'success'])
  const korMap = kors.reduce((prev, curr) => {
    prev[curr.personidentifikator] = curr
    return prev
  }, {})
  data.agreementParts = data.agreementParts.map(part => Object.assign({}, part, { kor: korMap[part.fnr] || true }))
  return data
}
