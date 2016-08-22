/**
 * custom library
 * utility
 */
'use strict';

// date time is a prototype function on date, no need for variable
_LIB.add('util/date-format');

// various functions
let string = _LIB.add('util/string');
let response = _LIB.add('util/response');
let debug = _LIB.add('util/debug');
let log = _LIB.add('util/log');

// aggregate to util namespaces
_LIB.util = {string, response, debug, log};
