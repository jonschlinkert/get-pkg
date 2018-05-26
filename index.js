/*!
 * get-pkgs <https://github.com/jonschlinkert/get-pkgs>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

const request = require('axios');

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

  const url = 'https://registry.npmjs.org/' + name + '/';

  request.get(url + version)
    .then(function(res) {
      cb(null, res.data);
    })
    .catch(function(err) {
      if (err.response.status === 500) {
        return cb(new Error(err.response.status));
      }
      if (err.response.status === 404) {
        const error = new Error('document not found');
        error.code = err.response.status;
        error.pkgName = name;
        return cb(error);
      }
      return cb(err);
    });
};

function isScoped(name) {
  return name && name[0] === '@';
}
