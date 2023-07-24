# get-pkg [![NPM version](https://img.shields.io/npm/v/get-pkg.svg?style=flat)](https://www.npmjs.com/package/get-pkg) [![NPM monthly downloads](https://img.shields.io/npm/dm/get-pkg.svg?style=flat)](https://npmjs.org/package/get-pkg) [![NPM total downloads](https://img.shields.io/npm/dt/get-pkg.svg?style=flat)](https://npmjs.org/package/get-pkg)

> Get the package.json for a project from npm.

Please consider following this project's author, [Jon Schlinkert](https://github.com/jonschlinkert), and consider starring the project to show your :heart: and support.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save get-pkg
```

Also see [get-pkgs](https://github.com/jonschlinkert/get-pkgs), if you need to get more than one `package.json`.

## Usage

```js
const getPkg = require('get-pkg');
const data = await getPkg('generate')

console.log(data);
//=> { name: 'generate', ... }
```

## About

<details>
<summary><strong>Contributing</strong></summary>

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

</details>

<details>
<summary><strong>Running Tests</strong></summary>

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

```sh
$ npm install && npm test
```

</details>

<details>
<summary><strong>Building docs</strong></summary>

_(This project's readme.md is generated by [verb](https://github.com/verbose/verb-generate-readme), please don't edit the readme directly. Any changes to the readme must be made in the [.verb.md](.verb.md) readme template.)_

To generate the readme, run the following command:

```sh
$ npm install -g verbose/verb#dev verb-generate-readme && verb
```

</details>

### Related projects

You might also be interested in these projects:

* [get-pkgs](https://www.npmjs.com/package/get-pkgs): Get the package.json for an array of repos from the npm registry, optionally filtering properties… [more](https://github.com/jonschlinkert/get-pkgs) | [homepage](https://github.com/jonschlinkert/get-pkgs "Get the package.json for an array of repos from the npm registry, optionally filtering properties using glob patterns.")
* [github-base](https://www.npmjs.com/package/github-base): Low-level methods for working with the GitHub API in node.js/JavaScript. | [homepage](https://github.com/jonschlinkert/github-base "Low-level methods for working with the GitHub API in node.js/JavaScript.")

### Contributors

| **Commits** | **Contributor** |
| --- | --- |
| 21 | [jonschlinkert](https://github.com/jonschlinkert) |
| 2  | [doowb](https://github.com/doowb) |
| 1  | [joakimbeng](https://github.com/joakimbeng) |

### Author

**Jon Schlinkert**

* [GitHub Profile](https://github.com/jonschlinkert)
* [Twitter Profile](https://twitter.com/jonschlinkert)
* [LinkedIn Profile](https://linkedin.com/in/jonschlinkert)

### License

Copyright © 2023, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT License](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.8.0, on July 24, 2023._
