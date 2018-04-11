const getNextJobFromQueue = require('./lib/steps/get-next-job-from-queue')
const getFileData = require('./lib/steps/get-file-data')
const decideFlow = require('./lib/steps/decide-flow')
const logger = require('./lib/logger')

logger('info', ['index', 'start'])

getNextJobFromQueue()
  .then(getFileData)
  .then(decideFlow)
  .then(data => {
    logger('info', ['index', data._id, 'finished'])
    process.exit(0)
  })
  .catch(error => {
    logger('error', ['index', 'error', JSON.stringify(error)])
    process.exit(1)
  })
