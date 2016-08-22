'use strict';

let cnf = require(_PATH_ROOT + 'config/production/app');

// start of uat config
cnf.env = 'uat';

// end of local config

module.exports = cnf;
