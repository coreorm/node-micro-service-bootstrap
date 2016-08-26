/**
 * Service entry point
 * use node index.js -p <port> -m <service name(s)> -e <environment> to start
 */
'use strict';

const cluster = require('cluster');

global._isMaster = cluster.isMaster;
global._isWorker = cluster.isWorker;

if (_isMaster) {
  var numWorkers = require('os').cpus().length;
  for (var i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

  cluster.on('online', function (worker) {
    console.log('Worker ' + worker.process.pid + ' is online');
  });

  cluster.on('exit', function (worker, code, signal) {
    // restart worker
    cluster.fork();
  });
  // stop here - nothing should happen in master
  return;
}

// include header
require('./header');

const fs = require('fs');

require('./server');
// load modules when necessary
if (_CONF.services) {
  _CONF.services.map(function (item) {
    _v(`load service`, item);
    let path = `${_PATH_ROOT}services/${item}/index.js`;
    try {
      require(path);
      _debug('service loaded: ' + item);
    } catch (e) {
      _log('load service', `path: ${path} not found ${e.message}`, 'ERROR');
      process.exit(1);
    }
  });
}

// start server here
APP.startServer(function(server) {
  _log('SERVER', 'server listens to port ' + server.address().port);
});

// verbose
_v('env', _CONF.env);
_v('config', _CONF);
_v('lib', _LIB);
