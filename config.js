if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

module.exports = {
  ARCIVE_DIRECTORY_PATH: process.env.ARCIVE_DIRECTORY_PATH || 'test/directories/archive',
  CALLBACK_DIRECTORY_PATH: process.env.CALLBACK_DIRECTORY_PATH || 'test/directories/callback',
  DISTRIBUTION_DIRECTORY_PATH: process.env.DISTRIBUTION_DIRECTORY_PATH || 'test/directories/distribution',
  DONE_DIRECTORY_PATH: process.env.DONE_DIRECTORY_PATH || 'test/directories/done',
  ERRORS_DIRECTORY_PATH: process.env.ERRORS_DIRECTORY_PATH || 'test/directories/errors',
  QUEUE_DIRECTORY_PATH: process.env.QUEUE_DIRECTORY_PATH || 'test/directories/queue',
  DISTRIBUTION_CODE: process.env.DISTRIBUTION_CODE || '1111',
  DISTRIBUTION_LETTER_TYPE: process.env.DISTRIBUTION_LETTER_TYPE || 'BPOST',
  DISTRIBUTION_SYSTEM: process.env.DISTRIBUTION_SYSTEM || 'avtale-generator',
  DISTRIBUTION_SIGNATURE_FORSENDELSETYPE: process.env.DISTRIBUTION_SIGNATURE_FORSENDELSETYPE || 'tfk.signatur',
  DSF_JWT_SECRET: process.env.DSF_JWT_SECRET || 'Louie Louie, oh no, I got to go Louie Louie, oh no, I got to go',
  DSF_SERVICE_URL: process.env.DSF_SERVICE_URL || 'https://dsf.micro.tjeneste.win',
  P360_URL: process.env.P360_URL || 'http://tfk-fh-siweb01t.login.top.no:8088/SI.WS.Core/SIF/',
  P360_USER: process.env.P360_USER || 'domain/username',
  P360_PASSWORD: process.env.P360_PASSWORD || 'password',
  PAPERTRAIL_HOSTNAME: process.env.PAPERTRAIL_HOSTNAME || 'avtale-generator',
  PAPERTRAIL_HOST: process.env.PAPERTRAIL_HOST || 'logs.papertrailapp.com',
  PAPERTRAIL_PORT: process.env.PAPERTRAIL_PORT || 12345
}
