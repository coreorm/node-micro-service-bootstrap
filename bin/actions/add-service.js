/**
 * create microservice project
 */

'use strict';

const efs = require('extfs');
const fs = require('fs');

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
    description: 'Specify the directory where the project resides. If you are running this command inside the project already, there\'s no need to specify the directory.'
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
    content: 'command: add-service \nAdd new services into micro services project'
  },
  {
    header: 'Example',
    content: 'microservice-bootstrap add-service foo,bar,foo2 --target-directory ./my-services --verbose'
  },
  {
    header: 'Options',
    optionList: def
  }
];

const serviceTmp = `/**
 * service: {service}
 */

'use strict';

/**
 * a success example
 */
APP.get('/{service}', function (req, res) {
  let json = _LIB.util.response.success('{service} is online', \`Edit \${__dirname}/index.js to change this api.\`);
  res.send(json);
  // a failure example
  // let jsonErr = _LIB.util.response.error(new Error('my error'));
  // res.send(jsonErr);
});`;

const str = require('../../lib/util/string');

module.exports = function (params) {
  //console.log(params);
  // get opts
  let opts = optsParser(def, sections);

  global._verbose = opts.verbose === true;

  _v('Add services');
  _v('opts', opts);
  _v('params', params);

  // structure of directory

  // services names
  if (typeof params[0] === 'undefined') {
    console.log('Please specify the names of the services you would like to add, separate by comma (,) and no spaces.');
    process.exit(1);
  }

  let names = params[0].split(',');
  _v('names', names);

  // path
  let path = './';
  if (opts['target-directory']) {
    path = opts['target-directory'];
  }
  let serviceDir;
  try {
    // is it correct? look for services/ dir
    path = fs.realpathSync(path);
    serviceDir = fs.realpathSync(path + '/services');
    _v('service dir', serviceDir);
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
  // create service
  names.forEach(function (item) {
    console.log('- create service: ' + item);
    try {
      let serviceSrc = str.template(serviceTmp, {service: item});
      // store
      fs.mkdirSync(serviceDir + `/${item}`);
      fs.writeFileSync(serviceDir + `/${item}/index.js`, serviceSrc);
      console.log(`Successfully created service ${item}`);
    } catch (e) {
      console.log(`Failed to create service ${item} \n` + e.message);
    }
  });

};
