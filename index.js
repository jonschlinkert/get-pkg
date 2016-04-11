/*!
 * get-pkgs <https://github.com/jonschlinkert/get-pkgs>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var request = require('min-request');

module.exports = function getPkg(name, version, cb) {
  if (typeof version === 'function') {
    cb = version;
    version = '';
  }
  if (isScoped(name)) {
    name = '@' + encodeURIComponent(name.slice(1));
    version = ''; // npm does not allow version for scoped packages
  } else if (!version) {
    version = 'latest';
  }

  var url = 'https://registry.npmjs.org/' + name + '/';

  request(url + version, {}, function(err, res) {
    if (err) return cb(err);
    if (res.statusCode === 500) {
      return cb(new Error(res.statusMessage));
    }
    if (res.statusCode === 404) {
      var error = new Error('document not found');
      error.code = res.statusCode;
      error.pkgName = name;
      return cb(error);
    }
    var pkg = JSON.parse(res.body);
    if (pkg.error && pkg.reason) {
      return cb(new Error(pkg.reason));
    }
    cb(null, pkg);
  });
};

function isScoped(name) {
  return name && name[0] === '@';
}
