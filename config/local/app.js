'use strict';

let cnf = require(_PATH_ROOT + 'config/uat/app');

// start of local config
cnf.debug = true;
cnf.env = 'local';

// end of local config

module.exports = cnf;
