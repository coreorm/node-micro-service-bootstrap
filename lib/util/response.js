/**
 * Response utilities
 */
'use strict';

const send = (data, message, code, isSuccess) => {
  let resp = {
    data: data,
    message: message,
    success: isSuccess === true,
    code: code,
    size: JSON.stringify(data).length,
    time: Date.now()
  };

  if (_CONF.debug === true) {
    resp._debug = _LIB.util.debug.info();
  }
  return resp;
};

/**
 * format responses
 * @type {{success: (function(*=, *=, *=)), error: (function(*=, *=, *=))}}
 */
module.exports = {
  success(data, message, code) {
    if (!code) {
      code = 200;
    }
    return send(data, message, code, true);
  },
  error(err, code) {
    if (!code) {
      code = 400;
    }
    console.log(err);
    return send(err.toString(), err.message, code, false);
  }
};
