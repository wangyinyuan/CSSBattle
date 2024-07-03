const log4js = require('log4js');
const fs = require('fs');

function loadLogConfig() {
  const config = JSON.parse(fs.readFileSync('./config/log4js.json', 'utf-8'));
  log4js.configure(config);
}

const dbLogger = log4js.getLogger('db');
const apiLogger = log4js.getLogger('api');
const logger = log4js.getLogger();

module.exports = {
  loadLogConfig,
  dbLogger,
  apiLogger,
  logger,
}
