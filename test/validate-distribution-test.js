const test = require('ava')
const validateDistribution = require('../lib/validate-distribution')

test('it changes nothing if kor is true', t => {
  const kor = true
  const distribution = {
    signaturtype: 'AUTENTISERT_SIGNATUR',
    signeringUtloper: '2018-02-09',
    kunDigitalLevering: true
  }
  const validatedDistribution = validateDistribution(distribution, kor)
  t.deepEqual(validatedDistribution, distribution, 'Nothings changed')
})

test('it changes distribution if kor is false', t => {
  const kor = false
  const distribution = {
    signaturtype: 'AUTENTISERT_SIGNATUR',
    signeringUtloper: '2018-02-09',
    kunDigitalLevering: true
  }
  const expectedDistribution = {
    kunDigitalLevering: false
  }
  const validatedDistribution = validateDistribution(distribution, kor)

  t.deepEqual(validatedDistribution, expectedDistribution, 'Changes ok')
})
