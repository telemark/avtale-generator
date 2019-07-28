module.exports = (data, kor) => {
  const distribution = Object.assign({}, data)
  if (Object.prototype.hasOwnProperty.call(distribution, 'signaturtype') && Object.prototype.hasOwnProperty.call(distribution, 'signeringUtloper') && kor === false) {
    delete distribution['signaturtype']
    delete distribution['signeringUtloper']
  }
  distribution.kunDigitalLevering = distribution.kunDigitalLevering && kor
  return distribution
}
