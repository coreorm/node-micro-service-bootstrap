/**
 * create microservice project
 */

'use strict';

const def = [
  {
    name: 'help',
    alias: 'h',
    type: Boolean,
    description: 'You are looking at it.'
  },
  {
    name: 'target-directory',
    alias: 't',
    type: String,
    description: 'Specify the directory where the project should reside.'
  },
  {
    name: 'verbose',
    alias: 'v',
    type: Boolean,
    description: 'Make it bubbly.'
  }
];

const sections = [
  {
    header: 'Micro Service Bootstrap',
    content: 'command: create \nCreate new micro services project'
  },
  {
    header: 'Example',
    content: 'microservice-bootstrap create --target-directory ./ --verbose'
  },
  {
    header: 'Options',
    optionList: def
  }
];

module.exports = function (params) {
  //console.log(params);
  // get opts
  let opts = optsParser(def, sections);

  global._verbose = opts.verbose === true;

  _v('create project');
  _v('opts', opts);
  _v('params', params);

  // path
  let path = './';
  if (opts['target-directory']) {
    path = opts['target-directory'];
  }

  // create by fetching from github
  const gd = require('github-download');
  console.log('Downloading latest master from node-micro-service-bootstrap to ' + path);
  gd({user: 'coreorm', repo: 'node-micro-service-bootstrap', ref: 'master'}, path)
    .on('dir', function (dir) {
      console.log(dir)
    })
    .on('file', function (file) {
      console.log(file)
    })
    .on('zip', function (zipUrl) {
      console.log(zipUrl)
    })
    .on('error', function (err) {
      console.error(err)
    })
    .on('end', function () {
      _v(`download finished, files are stored in ${path}`);
    })


};
