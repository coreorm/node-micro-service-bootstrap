# Micro Service Bootstrap for NodeJS

A bootstrap for simple micro-services powered by NodeJS. It's a monolithic aggregation of all micro services written in NodeJS. 

It's already heroku compatible and can be deployed with forever on your own server stack as well.

## Quick start

### installation

```
npm install mocha forever -g
npm install
```


### create your own service.

All web service packages are under `./services`, in the following structure:

```
services
└── default
    └── index.js
```

Just follow the default service structure and add your own service. For details, see below *Service How-to* section

### start the server

`node index.js [options]`

e.g.
```
node index.js -e local -s my-service -v
```

Or run `node index.js -h` to see the man page for more details on the allowed options.

## globals

| name | description | example/comment |
|---|---|---|
| `_CONF` | configuration object | `_CONF.env` |
|`_PATH_ROOT`|root path| `require(_PATH_ROOT + 'header.js')` |
|`_PATH_LIB`|library path| points to `./lib/` |
| `_LIB` | custom library object | Libraries can be registered in different environments, see *Environment How-to* for more details |

## How-to

### Service How-to 

The server is already setup with global `APP` variable, simply do your routes (APP is an instance of express) e.g.

```
APP.get('/', function(req, res) {
    res.send('hello world!');
});
```
For more details, check [express](https://expressjs.com/) website.

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
├── foo         // package
│   ├── foo1.js
│   └── foo2.js
├── foo.js      // package header - use it to include package files
```

### Test How-to



### Debug How-to

Pass `x-debug-enabled=true` in the header to enable debug output (NOT supported in production mode), use the `UTIL.debug` object to log/dump variables when necessary

### Logging How-to

Use `_log(section, data, level = INFO|ERROR|SUCCESS|...)` to log (this will format it into logstash friendly message structure) 
- section is where your code runs (e.g. 'service:foo', or a filename)
- data can be a simple string, or a complex javascript object.
- level: text value for level of the log

Log format is a custom pattern for logstash, feel free to change it by overriding the custom `global._log` function, or directly update `lib/util/log.js`.

Default GROK syntax: 
```
\[(?<datetime>.+)\] (?<level>[\w]+) "(?<section>[^"]+)" DATA<(?<data>.+)>$
```

### Verbose output How-to

Simply use `_v(section, data)` to log out the verbose output. This will remain hidden unless the app is run with `-v` or `--verbose`.
