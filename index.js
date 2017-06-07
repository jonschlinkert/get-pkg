/*!
 * get-pkgs <https://github.com/jonschlinkert/get-pkgs>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var request = require('min-request');

var OFFICIAL_REGISTRY = 'https://registry.npmjs.org/';

module.exports = function getPkg(name, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts;
    opts = {
      version: '',
      registry: OFFICIAL_REGISTRY
    };
  }

  if (!opts.registry) {
    opts.registry = OFFICIAL_REGISTRY;
  } else if (opts.registry.lastIndexOf('/') !== opts.registry.length - 1) {
    opts.registry = opts.registry + '/';
  }

  if (isScoped(name)) {
    name = '@' + encodeURIComponent(name.slice(1));
    opts.version = ''; // npm does not allow version for scoped packages
  } else if (!opts.version) {
    opts.version = 'latest';
  }

  var url = opts.registry + name + '/';

  request(url + opts.version, {}, function(err, res) {
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
