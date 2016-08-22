/**
 * String utilities
 * this one is compatible with frontend too, so written in a way it can be
 * included in frontend, and accessible via window.Util_Str
 */
(function (w) {
  'use strict';

  w.Util_Str = {
    /**
     * capitlise
     * @param str
     * @returns {string}
     */
    capitalise(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    /**
     * camel case
     * @param str
     * @param delimiter
     * @returns {string}
     */
    camelCase(str, delimiter) {
      delimiter = (typeof delimiter === 'undefined') ? '_' : delimiter;
      let tmpAr = str.split(delimiter);
      let output = '';
      const S = this;
      tmpAr.forEach(function (el) {
        output += S.capitalise(el);
      });
      return output;
    },
    /**
     * simple template engine
     * replaces data values inside template (use {var})
     * @param tmp
     * @param data
     */
    template(tmp, data) {
      let output = tmp;
      for (let k in data) {
        let val = data[k];
        // add slash when it's $
        if (k.slice(0, 1) == '$') {
          k = "\\" + k;
        }
        output = output.replace(new RegExp('{' + k + '}', 'g'), val);
      }
      return output;
    }
  };

  if (typeof module === 'object') {
    module.exports = w.Util_Str;
  }
})(this);
