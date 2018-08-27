const test = require('ava')
const validateKor = require('../lib/validate-kor')

test('it returns true for organizations', t => {
  const data = true
  const validatedKor = validateKor(data)
  t.deepEqual(validatedKor, true, 'orgs ok')
})

test('it returns true for people not reserved', t => {
  const data = {
    personidentifikator: '26118642424',
    reservasjon: 'NEI'
  }

  const validatedKor = validateKor(data)
  t.deepEqual(validatedKor, true, 'unreserved ok')
})

test('it returns false for people reserved', t => {
  const data = {
    personidentifikator: '26118642424',
    reservasjon: 'JA'
  }

  const validatedKor = validateKor(data)
  t.deepEqual(validatedKor, false, 'reserved ok')
})
