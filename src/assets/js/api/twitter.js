var $ = require('jquery');

module.exports = function apiCall(endpoint, params) {
  params = $.param(params || {});
  return $.getJSON('/twitter-proxy.php?url=' + encodeURIComponent(endpoint + '?' + params));
};