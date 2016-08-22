/**
 * default service pack
 */

'use strict';
const marked = require('marked');
const fs = require('fs');

APP.get('/', function (req, res) {
  let file = _PATH_ROOT + 'README.md';
  let opts = {
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
  };
  marked.setOptions(opts);
  let src = marked(fs.readFileSync(file).toString()).replace(/<table>/g, '<table class="table">');
  res.send(`
  <html>
  <head>
    <title>Node Micro Service Bootstrap</title>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
    rel="stylesheet"
    crossorigin="anonymous">
    <style>
    h1, h2, h3, h4, h5{
    margin-top: 20px;
    }
    </style>
  </head>
  <body>
  <div class="container" style="margin-bottom: 60px;line-height: 1.8;">
    <div class="row">
    <div class="alert alert-info" role="alert"><strong>You are seeing this page because the default service is loaded,
    run the app with custom services and the default service will be replaced.</strong></div>
    ${src}
    </div>
  </div>
  </body>
  </html>
  `);
});

/**
 * example apis
 */
APP.get('/example/:action', function (req, res) {
  const example = _LIB.example;
  const action = req.params.action;

  try {
    const callback = _LIB.example[action];
    res.send(_LIB.util.response.success(callback('hello world'), `action ${action} success`));
  } catch (e) {
    res.send(_LIB.util.response.error(e));
  }
});
