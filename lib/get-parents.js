function isBosatt (person) {
  return person['STAT-KD'].toString() === '1'
}

function getInrs (person) {
  const inrs = []
  if (person['FORAN-KD'] === 'D') {
    if (person['MOR-INR']) {
      inrs.push(person['MOR-INR'])
    }
    if (person['FAR-INR']) {
      inrs.push(person['FAR-INR'])
    }
  }
  if (person['FORAN-KD'] === 'M') {
    if (person['MOR-INR']) {
      inrs.push(person['MOR-INR'])
    }
  }
  if (person['FORAN-KD'] === 'F') {
    if (person['FAR-INR']) {
      inrs.push(person['FAR-INR'])
    }
  }
  return inrs
}

module.exports = data => {
  let foreldre = []

  if (data.FOR && data.HOV['FORAN-KD']) {
    const parents = Array.isArray(data.FOR) ? data.FOR : [data.FOR]
    const bosatteParents = parents.filter(isBosatt)
    const inrs = getInrs(data.HOV)
    foreldre = bosatteParents.filter(parent => inrs.includes(parent.INR))
  }

  return foreldre
}
