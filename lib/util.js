/**
 * custom library
 * utility
 */
'use strict';

// date time is a prototype function on date, no need for variable
require('../lib/util/date-format');

// various functions
let string = require('../lib/util/string');
let response = require('../lib/util/response');
let debug = require('../lib/util/debug');
let log = require('../lib/util/log');

// aggregate to util namespaces
_LIB.util = {string, response, debug, log};
// globals
global._log = _LIB.util.log;
global._v = function (name, data) {
  if (_CONF.verbose === true) {
    _log(name, data, 'VERBOSE');
  }
};
// debug funcs
global._dump = _LIB.util.debug.dump;
global._debug = _LIB.util.debug.log;
