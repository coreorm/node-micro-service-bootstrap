/**
 * Debug utilities
 * @note: this is global
 */
module.exports = {
  /**
   * store the basic info
   * for other objects to use
   * NOTE: this is global
   */
  info: {
    logs: [],
    dataDump: {}
  },
  /**
   * log message
   * @param message
   */
  log(message) {
    this.info.logs.push(`${Date.now()}    ${message}`);
  },
  /**
   * dump objects
   * @param name
   * @param data
   */
  dump(name, data) {
    this.info.dataDump[name] = data;
  },
  /**
   * reset data
   */
  reset() {
    this.info = {
      logs: [],
      dataDump: {}
    };
  }
};
