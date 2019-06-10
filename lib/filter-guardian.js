const getParents = require('./get-parents')
const getGuardianRecipients = require('./get-guardian-recipients')

module.exports = data => {
  // const person = data.HOV
  const parents = getParents(data)
  const recipients = getGuardianRecipients(parents)
  return recipients
  /*
  const guardian = recipients.filter(recipient => {
    return `${recipient.ADR}, ${recipient.POSTN} ${recipient.POSTS}` === `${person.ADR}, ${person.POSTN} ${person.POSTS}`
  })
  return guardian
  */
}
