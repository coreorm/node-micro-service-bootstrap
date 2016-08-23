/**
 * global server setup
 */
'use strict';

// the APP server
global.APP = require('express')();

APP.set('port', _CONF.port);

const preProcessor = (req, res, next) => {
  // allow cors
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT');
  res.header('Access-Control-Allow-Headers', 'Content-Type,x-api-key,x-debug-enabled');

  // put back no cache headers
  res.header('Cache-Control', 'no-store');
  res.header('Pragma', 'no-cache');
  res.header('Expires', 'Sun, 27 Jul 1997 05:00:00 GMT');

  // check debug enabled or not - not prod, and debug is enabled already
  _CONF.debug = false;
  if (_CONF.env !== 'production') {
    if (typeof req.get('x-debug-enabled') != 'undefined' ||
      typeof req.query['x-debug-enabled'] != 'undefined') {
      _CONF.debug = true;
    }
  }

  // continue
  next();
};
APP.use(preProcessor);

// timeout
const Timeout = require('connect-timeout');
const haltOnTimedout = function (req, res, next) {
  if (!req.timedout) {
    next();
  }
};

APP.use(Timeout(_CONF.timeout));
APP.use(haltOnTimedout);


// by default the app server will parse JSON from body
let bodyParser = require('body-parser');
APP.use(bodyParser.json());

APP.get('/ping', function (req, res) {
  res.send('pong');
});

/**
 * call this function to start the server
 * @param callback
 */
APP.startServer = (callback) => {
  let server = APP.listen(APP.get('port'), function () {
    callback(server);
  });
};
