function isAvailable (parent) {
  const validStats = ['0']
  return validStats.includes(parent['SPES-KD'].toString())
}

module.exports = parents => {
  let guardians = []

  if (parents.length > 0) {
    const available = parents.filter(isAvailable)
    if (available.length > 1) {
      // Looks for unique addresses if more than 1 both gets included
      const adresses = new Set(parents.map(parent => `${parent.ADR}, ${parent.POSTN} ${parent.POSTS}`))
      guardians = [...adresses].length > 1 ? parents : [parents[0]]
    } else {
      guardians = available
    }
  }

  return guardians
}
