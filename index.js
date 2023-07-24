/*!
 * get-pkg <https://github.com/jonschlinkert/get-pkg>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

const https = require('https');
const { parse } = require('parse-package-name');

const YARM_HOSTNAME = 'registry.yarnpkg.com';
const NPM_HOSTNAME = 'registry.npmjs.org';

const handleBadResponse = (res, name, data, parsed) => {
  const err = new Error(data.message);

  err.status = res.statusCode || res.status;
  err.code = data.code;

  if (data.code === 'MethodNotAllowedError') {
    err.message = `package.json not found for "${name}"`;

    if (parsed.version?.startsWith('v')) {
      err.message += ` are you sure version ${parsed.version} should start with a "v"?`;
    }
  }

  return err;
};

const createOptions = (name, { hostname = YARM_HOSTNAME } = {}) => {
  const parsed = parse(name);

  if (name.startsWith('@') && hostname === NPM_HOSTNAME) {
    parsed.name = `@${encodeURIComponent(parsed.name.slice(1))}`;
  }

  const domain = `https://${hostname.replace(/^https?:\/\//, '')}`;
  const options = {
    hostname,
    path: `/${parsed.name}/${parsed.version}${parsed.path}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  if (parsed.path) {
    options.path += parsed.path;
  }

  const url = new URL(options.path, domain);
  return { options, url, parsed };
};

const getUnpkg = async (name, hostname) => {
  const parsed = parse(name);

  if (!name.endsWith('/package.json') && !parsed.path) {
    name += '/package.json';
  }

  const res = await fetch(new URL(name, hostname));
  const output = await res.text();
  return JSON.parse(output);
};

const getPkg = async (name, { hostname = NPM_HOSTNAME, ...options } = {}) => {
  if (hostname !== YARM_HOSTNAME && hostname.includes('unpkg')) {
    return getUnpkg(name, hostname);
  }

  if (typeof fetch === 'undefined') {
    return request(name, { ...options, hostname: NPM_HOSTNAME });
  }

  const { url, ...parsed } = createOptions(name, { hostname });
  const res = await fetch(url);
  const output = await res.text();
  const data = JSON.parse(output);

  if (res.status !== 200) {
    throw handleBadResponse(res, name, data, { url, ...parsed });
  }

  return data;
};

const request = (name, args) => {
  const { options, parsed } = createOptions(name, args);

  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let output = '';

      if (res.statusCode !== 200) {
        reject(handleBadResponse(res, name, { code: 'NotFound' }, parsed));
        return;
      }

      res.on('data', chunk => {
        output += chunk;
      });

      res.on('end', () => resolve(JSON.parse(output)));
    });

    req.on('error', reject);
    req.end();
  });
};

module.exports = getPkg;
