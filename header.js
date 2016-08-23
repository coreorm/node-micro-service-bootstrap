/**
 * header
 */
'use strict';

// paths
const path = require('path');
global._PATH_ROOT = path.resolve(__dirname) + '/';
global._PATH_LIB = path.resolve(__dirname) + '/lib/';
// configuration
global._CONF = {};
// shared library (custom)
global._LIB = {};
// utilities
global._UTIL = {};

/**
 * get default value
 * @param key
 * @param defaultValue
 * @returns {*}
 */
const getEnv = (key, defaultValue) => {
  if (process.env[key]) {
    return process.env[key];
  }
  return defaultValue;
};

// app environment
const env = getEnv('environment', 'local');

// include config and expose to global
try {
  global._CONF = require(`./config/${env}/app`);
} catch (e) {
  console.error(`Unable to find the environment [${env}], please double check your running command`);
  console.log(usage);
  process.exit(1);
}

_CONF.verbose = getEnv('VERBOSE', 'false') !== 'false';
let services = getEnv('SERVICE_NAME', 'default');
_CONF.services = services.split(',');
_CONF.port = getEnv('PORT', 8080);
_CONF.timeout = getEnv('TIMEOUT', 1000);  // default 1 second timeout

// custom lib loader
require(`./config/${env}/lib.js`);

