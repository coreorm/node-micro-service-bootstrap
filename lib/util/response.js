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
    resp._debug = _LIB.utlity.debug.info;
  }
  return resp;
};

/**
 * format responses
 * @type {{success: (function(*=, *=, *=)), error: (function(*=, *=, *=))}}
 */
module.exports = {
  success(data, message, code) {
    return send(data, message, code, true);
  },
  error(data, message, code) {
    return send(data, message, code, false);
  }
};
