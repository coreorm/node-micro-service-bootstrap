/**
 * Service entry point
 * use node index.js -p <port> -m <service name(s)> -e <environment> to start
 */
'use strict';

// include header
require('./header');

// verbose
_v('env', _CONF.env);
_v('config', _CONF);
