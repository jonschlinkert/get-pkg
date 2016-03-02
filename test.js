/*!
 * get-pkg <https://github.com/jonschlinkert/get-pkg>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

require('mocha');
var assert = require('assert');
var getPkg = require('./');

describe('getPackages', function() {
  it('should get a package.json for the given project', function(cb) {
    getPkg('generate', function(err, pkg) {
      assert(!err);
      assert(pkg);
      assert.equal(pkg.name, 'generate');
      cb();
    });
  });

  it('should handle errors', function(cb) {
    getPkg('fofofofofofoofofof', function(err, pkg) {
      assert(err);
      assert.equal(err.message, 'document not found');
      cb();
    });
  });

  it('should handle empty string', function(cb) {
    getPkg('', function(err, pkg) {
      assert(err);
      assert.equal(err.message, 'Internal Server Error');
      cb();
    });
  });

  it('should handle scoped packages', function(cb) {
    getPkg('@cycle/core', function(err, pkg) {
      assert(!err);
      assert(pkg);
      assert.equal(pkg.name, '@cycle/core');
      cb();
    });
  });
});
