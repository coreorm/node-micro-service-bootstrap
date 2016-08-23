#! /usr/bin/env node
'use strict';

const cla = require('command-line-args');
const getUsage = require('command-line-usage');

/**
 * action parser
 * @param action
 * @param callback
 */
const actionParser = function (action, callback) {
  let params = [];
  let cnt = 0;
  let isValid = false;
  process.argv.map(function (item) {
    if (item.slice(0, 1) == '-') {
      return;
    }
    if (item === action) {
      isValid = true;
    }
    if (isValid) {
      cnt++;
    }
    if (cnt > 1) {
      params.push(item);
    }
  });
  if (cnt >= 1) {
    callback(params);
  }
};

/**
 * parse opts
 * @param definition
 * @param sections
 */
global.optsParser = function (definition, sections) {
  const usage = getUsage(sections);
  let opts = [];

  try {
    opts = cla(definition);
  } catch (e) {
    // invalid options
    console.error('Error parsing options: ' + e.toString());
    console.log(usage);
    process.exit(1);
  }

  if (opts.help === true) {
    console.log(usage);
    process.exit(0);
  }

  return opts;
};

global._verbose = false;

/**
 * verbose mode
 *
 * @param message
 * @param obj
 * @private
 */
global._v = function (message, obj) {
  if (_verbose) {
    if (obj) {
      obj = JSON.stringify(obj);
    } else {
      obj = '';
    }
    console.log(`${Date.now()} ${message} ${obj}`);
  }
};

['create', 'init-service', 'start-service', 'stop-service', 'log', 'help'].forEach(function (item) {
  actionParser(item, function (params) {
    require('./actions/' + item)(params);
  });
});




