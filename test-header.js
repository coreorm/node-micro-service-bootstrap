/**
 * header for unit tests
 */
process.env.NODE_ENV = 'local';
require('./header.js');
require('mocha');
global.expect = require('chai').expect;
