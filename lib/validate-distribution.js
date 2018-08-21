module.exports = (data, kor) => {
  let distribution = Object.assign({}, data)
  if (distribution.hasOwnProperty('signaturtype') && distribution.hasOwnProperty('signeringUtloper') && kor === false) {
    delete distribution['signaturtype']
    delete distribution['signeringUtloper']
  }
  distribution.kunDigitalLevering = distribution.kunDigitalLevering && kor
  return distribution
}
