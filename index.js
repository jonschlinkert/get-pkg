/*!
 * get-pkg <https://github.com/jonschlinkert/get-pkg>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Released under the MIT License.
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

  const promise = request.get(`https://registry.npmjs.org/${name}/${version}`)
    .then(res => res.data)
    .catch(err => {
      if (err.response.status === 500) {
        return Promise.reject(new Error(err.response.status));
      }
      if (err.response.status === 404) {
        const error = new Error('document not found');
        error.code = err.response.status;
        error.pkgName = name;
        return Promise.reject(error);
      }
      return Promise.reject(err);
    });

  if (typeof cb === 'function') {
    promise.then(res => cb(null, res)).catch(cb);
    return;
  }

  return promise;
};

function isScoped(name) {
  return name && name[0] === '@';
}
