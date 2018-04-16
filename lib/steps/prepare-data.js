const uuid = require('uuid/v4')

module.exports = data => {
  return new Promise((resolve, reject) => {
    const addons = {
      errors: [],
      agreementId: uuid(),
      archive: {
        _id: data._id
      }
    }
    resolve(Object.assign(data, addons))
  })
}
