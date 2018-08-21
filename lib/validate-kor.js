module.exports = data => {
  let valid = false
  // recipient is person and not reserved
  if (data !== true) {
    if (data.personer && data.personer[0] && data.personer[0].reservasjon && data.personer[0].reservasjon === 'NEI') {
      valid = true
    }
  } else {
    // recipient is organization
    valid = true
  }
  return valid
}
