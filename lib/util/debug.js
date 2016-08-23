/**
 * Debug utilities
 * @note: this is global
 */
'use strict';

let info = {
  logs: [],
  data: {}
};

module.exports = {
  /**
   * store the basic info
   * for other objects to use
   * NOTE: this is global
   */
    info() {
    return info;
  },
  /**
   * log message
   * @param message
   */
    log(message) {
    info.logs.push(`${Date.now()}    ${message}`);
  },
  /**
   * dump objects
   * @param name
   * @param data
   */
    dump(name, data) {
    info.data[name] = data;
  },
  /**
   * reset data
   */
    reset() {
    info = {
      logs: [],
      data: {}
    };
  }
};
