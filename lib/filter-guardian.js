const getParents = require('./get-parents')
const getGuardianRecipient = require('./get-guardian-recipients')

module.exports = data => {
  const person = data.HOV
  const parents = getParents(data)
  const recipients = getGuardianRecipient(parents)
  const guardian = recipients.filter(recipient => {
    return `${recipient.ADR}, ${recipient.POSTN} ${recipient.POSTS}` === `${person.ADR}, ${person.POSTN} ${person.POSTS}`
  })
  return guardian
}
