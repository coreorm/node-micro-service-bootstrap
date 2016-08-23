# Micro Service Bootstrap for NodeJS

A bootstrap for simple micro-services powered by NodeJS. It's a monolithic aggregation of all micro services written in NodeJS. 

It's already heroku compatible and can be deployed with forever on your own server stack as well.

Source: [https://github.com/coreorm/node-micro-service-bootstrap](https://github.com/coreorm/node-micro-service-bootstrap)

Heroku App Example: [https://glacial-mountain-78419.herokuapp.com/](https://glacial-mountain-78419.herokuapp.com/).

Example APIs:
- [ping](https://glacial-mountain-78419.herokuapp.com/ping)
- [example: foo](https://glacial-mountain-78419.herokuapp.com/example/foo)
- [example: bar](https://glacial-mountain-78419.herokuapp.com/example/bar)

## Quick start

### Install from NPM

`npm install -g microservice-bootstrap`

### Installation

```
npm install mocha forever -g
npm install
```


### Create your own service.

All web service packages are under `./services`, in the following structure:

```
services
└── my-service
    └── index.js
```

Just follow the default service structure and add your own service. For details, see below *Service How-to* section

### Start the server

`node index.js [options]`

e.g.
```
node index.js -e local -s my-service -v
```

Or run `node index.js -h` to see the man page for more details on the allowed options.


## How-to

### Service How-to 

The server is already setup with global `APP` variable, simply do your routes (APP is an instance of express) e.g.

```
APP.get('/', function(req, res) {
    res.send('hello world!');
});
```
For more details, check [express](https://expressjs.com/) website.

#### JSON API response maker.

This bootstrap includes a very easy to use JSON response maker, the output format is: 
```
{
  "data": <Object or string>,
  "message": <String message>,
  "success": <Boolean true|false>,
  "code": <INT 200-500>,
  "size": <INT size of data in bytes>,
  "time": <TIMESTAMP milliseconds>
}
```

To use it, simple use the two apis: 
- for successful JSON output: `_LIB.util.response.success(data, message, code)`
- for erroneous JSON output: `_LIB.util.response.error(error, code)`.

Details see [./services/default/index.js](https://github.com/coreorm/node-micro-service-bootstrap/blob/master/services/default/index.js#L52).

### Environment How-to

#### Configuration

Configurations are environment specific, the are located inside ./config folder, the structure is as follows:

```
config
├── local
│   ├── app.js
│   └── lib.js
├── production
│   ├── app.js
│   └── lib.js
└── uat
    ├── app.js
    └── lib.js
```

These 3 environments are pre-installed, if you need to add more environment, just follow the same structure. `[environment name as folder name]/[config file]`
- app.js is the application config;
- lib.js is the library registry;

Config inheritance: `production` -> `uat` -> `local`;

#### Library

Library files should be placed inside ./lib, following the structure:

```
lib
├── README.md
├── package-name         // package
│   ├── file1.js
│   └── file2.js
├── package-name.js      // package header - use it to include package files
```



## Unit Tests

Simple run `npm run test`. All tests are under `./tests` folder. Follow `exampleTest.js` to write your own tests.


### Appendix

#### Globals

| name | description | example/comment |
|---|---|---|
| `_CONF` | configuration object | `_CONF.env` |
|`_PATH_ROOT`|root path| `require(_PATH_ROOT + 'header.js')` |
|`_PATH_LIB`|library path| points to `./lib/` |
| `_LIB` | custom library object | Libraries can be registered in different environments, see *Environment How-to* for more details |

#### Logging

Use `_log(section, data, level = INFO|ERROR|SUCCESS|...)` to log (this will format it into logstash friendly message structure) 
- section is where your code runs (e.g. 'service:foo', or a filename)
- data can be a simple string, or a complex javascript object.
- level: text value for level of the log

Log format is a custom pattern for logstash, feel free to change it by overriding the custom `global._log` function, or directly update `lib/util/log.js`.

Default GROK syntax: 
```
\[(?<datetime>.+)\] (?<level>[\w]+) "(?<section>[^"]+)" DATA<(?<data>.+)>$
```

#### Verbose output

Simply use `_v(section, data)` to log out the verbose output. This will remain hidden unless the app is run with `-v` or `--verbose`.


#### Debug

- use the `UTIL.debug` object to log/dump variables - NOTE it will only work when debug is enabled.
- Pass `x-debug-enabled=true` in the header to enable debug output (NOT supported in production mode). 

