module.exports = data => {
  const mottaker = {
    navn: data.fullName || data.navn,
    adresse1: data.address || data.adresse,
    postnr: data.zip || data.postnummer,
    poststed: data.city || data.poststed
  }

  if (data.personalIdNumber) {
    mottaker.fnr = data.personalIdNumber
  } else {
    mottaker.orgnr = data.organisasjonsNummer
  }

  return mottaker
}
