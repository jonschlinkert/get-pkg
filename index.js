/*!
 * get-pkgs <https://github.com/jonschlinkert/get-pkgs>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var lazy = require('lazy-cache')(require);
lazy('min-request', 'request');

module.exports = function getPkg(name, version, cb) {
  if (typeof version === 'function') {
    cb = version;
    version = '';
  }

  var url = 'https://registry.npmjs.org/' + name + '/';
  if (!version) version = 'latest';

  lazy.request(url + version, {}, function (err, res) {
    if (err) return cb(err);
    if (res.statusCode === 500) {
      return cb(new Error(res.statusMessage));
    }
    var pkg = JSON.parse(res.body);
    if (pkg.error && pkg.reason) {
      return cb(new Error(pkg.reason));
    }
    cb(null, pkg);
  });
}
