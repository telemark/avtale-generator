module.exports = (data, kor) => {
  let distribution = Object.assign({}, data)
  if (data.requireDigitalSignature === true && kor === false) {
    delete distribution['signaturtype']
    delete distribution['signeringUtloper']
  }
  return distribution
}
