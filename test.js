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

describe('getPackages', function() {
  this.timeout(5000);

  it('should get a package.json for the given project', function(cb) {
    getPkg('generate', function(err, pkg) {
      assert(!err);
      assert(pkg);
      assert.equal(pkg.name, 'generate');
      cb();
    });
  });

  it('should return a promise', function() {
    return getPkg('generate')
      .then(pkg => {
        assert(pkg);
        assert.equal(pkg.name, 'generate');
      });
  });

  it('should handle errors', function(cb) {
    getPkg('fofofofofofoofofof', function(err /*, pkg */) {
      assert(err);
      assert.equal(err.message, 'document not found');
      cb();
    });
  });

  it('should handle scoped packages', function() {
    return getPkg('@sellside/emitter')
      .then(pkg => {
        assert(pkg)
        assert.equal(pkg.name, '@sellside/emitter');
      });
  });
});
