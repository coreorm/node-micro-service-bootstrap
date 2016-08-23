module.exports = function() {
  const sections = [
    {
      header: 'Micro Service Bootstrap',
      content: 'Create, manage, and configure micro services project'
    },
    {
      header: 'create',
      content: 'create structure in specified location \n' +
      'run `microservice-bootstrap create -h` for more details.'
    },
    {
      header: 'add-service',
      content: 'add new service module in specified location \n' +
      'run `microservice-bootstrap add-service -h` for more details.'
    },
    {
      header: 'run',
      content: 'start service(s) \n' +
      'run `microservice-bootstrap start -h` for more details.'
    },
    {
      header: 'help',
      content: 'You are looking at it.'
    }
  ];

  const getUsage = require('command-line-usage');
  console.log(getUsage(sections));
};
