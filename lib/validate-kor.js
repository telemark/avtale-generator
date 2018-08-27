module.exports = data => {
  let valid = false
  // recipient is person and not reserved
  if (data !== true) {
    if (data && data.reservasjon && data.reservasjon === 'NEI') {
      valid = true
    }
  } else {
    // recipient is organization
    valid = true
  }
  return valid
}
