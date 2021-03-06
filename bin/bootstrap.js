#! /usr/bin/env node
'use strict';

const cla = require('command-line-args');
const getUsage = require('command-line-usage');

/**
 * action parser
 *
 * @param action
 * @param callback
 * @param callbackHelp
 */
const actionParser = function (actions, callback, callbackHelp) {
  let params = [];
  let cnt = 0;
  let isValid = false;
  let action = '';
  process.argv.map(function (item) {
    if (item.slice(0, 1) == '-') {
      return;
    }
    if (actions.indexOf(item) >= 0) {
      isValid = true;
      action = item;
    }
    if (isValid) {
      cnt++;
    }
    if (cnt > 1) {
      params.push(item);
    }
  });
  if (cnt >= 1) {
    callback(action, params);
  } else {
    // invalid, call help
    callbackHelp();
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
    console.log(`\n > ${message} ${obj}`);
  }
};

const Spinner = require('cli-spinner').Spinner;
const spinner = new Spinner('%s ');

global.spin = function (shouldSpin) {
  if (shouldSpin === true) {
    spinner.start();
  } else {
    spinner.stop(true);
  }
};


actionParser(['create', 'add-service', 'run', 'help'], function (item, params) {
  require('./actions/' + item)(params);
}, function () {
  require('./actions/help')();
  process.exit(0);
});




