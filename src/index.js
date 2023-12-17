require('dotenv').config();
const { log } = require('./functions');

log('Waking up...', 'info');

require('./handlers/express')();
require('./handlers/jobs')();
require('./handlers/mongoose')();