/*!
 * get-pkg <https://github.com/jonschlinkert/get-pkg>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

require('mocha');
const assert = require('assert');
const getPkg = require('./');

describe('get-pkg', function() {
  this.timeout(5000);

  it('should get a package.json for the given project', cb => {
    getPkg('generate', (err, pkg) => {
      assert(!err);
      assert(pkg);
      assert.equal(pkg.name, 'generate');
      cb();
    });
  });

  it('should return a promise', () => {
    return getPkg('generate')
      .then(pkg => {
        assert(pkg);
        assert.equal(pkg.name, 'generate');
      });
  });

  it('should handle errors', cb => {
    getPkg('fofofofofofoofofof', (err /*, pkg */) => {
      assert(err);
      assert.equal(err.message, 'document not found');
      cb();
    });
  });

  it('should handle scoped packages', () => {
    return getPkg('@sellside/emitter')
      .then(pkg => {
        assert(pkg)
        assert.equal(pkg.name, '@sellside/emitter');
      });
  });
});
