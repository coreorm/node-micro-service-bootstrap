/**
 * just a simple logger - not necessary on web so just module exports
 * use logStash format
 * @see https://www.elastic.co/guide/en/logstash/current/config-examples.html
 * [18/May/2011:12:40:18 -0700]
 */
'use strict';

/**
 * log function
 * first param is section, all others after that will be logged as an array of objects
 * grok syntax:
 * \[(?<datetime>.+)\] (?<type>[\w]+) "(?<section>[^"]+)" DATA<(?<data>.+)>$
 *
 * @param section
 * @param data
 * @param level
 */
module.exports = function (section, data, level) {
  const d = new Date();
  let now = d.format('yyyy-mm-dd :HH:mm:ss');
  section = JSON.stringify(section);

  // default level is INFO, then it can be customised (string)
  if (!level) {
    level = 'INFO';
  }
  level = level.toUpperCase();

  if (typeof data === 'object') {
    data = JSON.stringify(data);
  }

  console.log(`[${now}] ${level} ${section} DATA<${data}>`);
};
