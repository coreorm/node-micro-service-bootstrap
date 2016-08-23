/**
 * create microservice project
 */

'use strict';

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
    description: 'App port, default to 8080, can also be set by PORT from commandline'
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
  },
  {
    name: 'log',
    alias: 'l',
    type: String,
    description: 'log file path'
  },
  {
    name: 'help',
    alias: 'h',
    type: Boolean,
    description: 'Help / Man Page'
  }
];

const sections = [
  {
    header: 'Micro Service Bootstrap',
    content: 'command run\nRun services'
  },
  {
    header: 'Options',
    optionList: def
  }
];

module.exports = function (params) {
  // get opts
  let opts = optsParser(def, sections);
  global._verbose = opts.verbose === true;
  let envVars = {
    VERBOSE: JSON.stringify(global._verbose)

  };
  if (typeof opts['service-name'] === 'string') {
    envVars.SERVICE_NAME = opts['service-name'];
  }
  if (opts.port) {
    envVars.PORT = opts.port;
  }
  if (opts.timeout) {
    envVars.TIMEOUT = opts.timeout;
  }
  if (opts.environment) {
    envVars.NODE_ENV = opts.environment;
  }

  console.log('Run project\n');
  console.log('Environment variables', envVars);

  const forever = require('forever-monitor');

  let cnf = {
    max: 3,
    silent: false,
    env: envVars
  };
  if (opts.log) {
    cnf.outFile = opts.log;
  }

  let child = new (forever.Monitor)('index.js', cnf);

  child.on('exit', function () {
    console.log('index.js has exited after 3 restarts');
  });

  child.on('error', function (err) {
    console.error(err);
  });

  child.on('start', function (process, data) {
    console.log(`Process started, PID <${data.pid}>, LogFile: ${data.logFile}. CTRL+C to terminate this process.`);
  });

  child.start();
};
