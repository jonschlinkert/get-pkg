/*!
 * get-pkg <https://github.com/jonschlinkert/get-pkg>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

const assert = require('assert');
const getPkg = require('./');

describe('get-pkg', function() {
  // eslint-disable-next-line no-invalid-this
  this.timeout(20000);

  it('should fetch a package.json', async () => {
    const pkg = await getPkg('generate');
    assert.ok(pkg);
    assert.equal(pkg.name, 'generate');
  });

  it('should fetch a package with version', async () => {
    const pkg = await getPkg('generate@0.14.0');
    assert.ok(pkg);
    assert.equal(pkg.name, 'generate');
    assert.equal(pkg.version, '0.14.0');
  });

  it('should fetch scoped packages', async () => {
    const pkg = await getPkg('@folder/readdir');
    assert.ok(pkg);
    assert.equal(pkg.name, '@folder/readdir');
  });

  it('should fetch scoped, versioned packages', async () => {
    const pkg = await getPkg('@folder/readdir@3.1.0');
    assert.ok(pkg);
    assert.equal(pkg.version, '3.1.0');
    assert.equal(pkg.name, '@folder/readdir');
  });

  it('should support custom hostname URL', async () => {
    const pkg = await getPkg('@folder/readdir@3.1.0/package.json', {
      hostname: 'https://www.unpkg.com'
    });

    assert.ok(pkg);
    assert.equal(pkg.version, '3.1.0');
    assert.equal(pkg.name, '@folder/readdir');
  });

  it('should work with unpkg without package.json specified', async () => {
    const pkg = await getPkg('@folder/readdir@3.1.0', {
      hostname: 'https://www.unpkg.com'
    });

    assert.ok(pkg);
    assert.equal(pkg.version, '3.1.0');
    assert.equal(pkg.name, '@folder/readdir');
  });

  it('should fail when version is defined incorrectly', async () => {
    try {
      await getPkg('@folder/readdir@v3.1.0');
      throw new Error('expected an error');
    } catch (err) {
      assert.ok(err.code);
      assert.equal(err.status, 405);
    }
  });

  it('should handle errors', async () => {
    try {
      await getPkg('fofofofofofoofofof' + Date.now());
    } catch (err) {
      assert.ok(err);
      assert.equal(err.status, 404);
    }
  });
});
