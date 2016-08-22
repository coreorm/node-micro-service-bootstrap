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

// configurations
const cla = require('command-line-args');
const def = [
  {
    name: 'verbose',
    alias: 'v',
    type: Boolean,
    description: 'Verbose mode'
  },
  {
    name: 'port',
    alias: 'p',
    type: Number,
    description: 'App port'
  },
  {
    name: 'service-name',
    alias: 's',
    type: String,
    description: 'Service name(s), use comma separated string for multiple services'
  },
  {
    name: 'environment',
    alias: 'e',
    type: String,
    description: 'app environment, can also be set by NODE_ENV from commandline'
  },
  {
    name: 'timeout',
    alias: 't',
    type: Number,
    description: 'time out for express api'
  }
];

const getUsage = require('command-line-usage');

const sections = [
  {
    header: 'Micro Service Bootstrap',
    content: 'Please read the full README.md for more details'
  },
  {
    header: 'Options',
    optionList: def
  }
];
const usage = getUsage(sections)
let opts = [];

try {
  opts = cla(def);
} catch (e) {
  // invalid options
  console.error('Error parsing options: ' + e.toString());
  console.log(usage);
  process.exit(1);
}

/**
 * get default value
 * @param key
 * @param defaultValue
 * @returns {*}
 */
const getEnv = (key, defaultValue) => {
  if (opts[key]) {
    return opts[key];
  }
  return defaultValue;
};

// app environment
const env = getEnv('environment', process.env.NODE_ENV ? process.env.NODE_ENV : 'local');

// include config and expose to global
try {
  global._CONF = require(`./config/${env}/app`);
} catch (e) {
  console.error(`Unable to find the environment [${env}], please double check your running command`);
  console.log(usage);
  process.exit(1);
}

_CONF.verbose = getEnv('verbose', false);
let services = getEnv('service-name', 'default');
_CONF.services = services.split(',');
_CONF.port = getEnv('port', 8080);
_CONF.timeout = getEnv('timeout', 1000);  // default 1 second timeout

// custom lib loader
require(`./config/${env}/lib.js`);

