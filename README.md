# token-store

Manage tokens for authenticating to multiple servers.

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![standard][standard-image]][standard-url]
[![conduct][conduct]][conduct-url]

[npm-image]: https://img.shields.io/npm/v/token-store.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/token-store
[travis-image]: https://img.shields.io/travis/sethvincent/token-store.svg?style=flat-square
[travis-url]: https://travis-ci.org/sethvincent/token-store
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard
[conduct]: https://img.shields.io/badge/code%20of%20conduct-contributor%20covenant-green.svg?style=flat-square
[conduct-url]: CONDUCT.md

## About

This was built for [staticland](https://github.com/staticland), a static site hosting API. It's possible to create a new staticland server that manages static sites, so it's useful to be able to log into multiple servers.

This module provides a way to store the token for each server and switch between them.

token-store is meant to be used as a dependency of command-line tools that handle authentication and need a way to store the auth tokens that are returned.

## Install

```sh
npm install --save token-store
```

## Usage

```js
var tokenStore = require('token-store')

var tokens = tokenStore({ filename: 'tokenstoretest' })

/* add a token */
tokens.set({
  server: 'http://127.0.0.1:3322',
  token: 'some token here please'
})

var current = tokens.current()
console.log('current token:', current)

/* add another token */
tokens.set({
  server: 'https://example.com',
  token: 'another actual token'
})

var current = tokens.current()
console.log('\nnew current token:\n', current)

/* list all tokens */
console.log('\nall tokens:\n', tokens.get())

/* set current token from available tokens */
if (tokens.has('http://127.0.0.1:3322')) {
  current = tokens.current('http://127.0.0.1:3322')
  console.log('\nnew current token:\n', current)
}

/* delete a token */
tokens.delete('https://example.com')

/* list all tokens */
console.log('\nonly one token left:\n', tokens.get())

/* completely destroy token store file! */
tokens.destroy()
```

## Documentation
- [Tests](tests/)

### Examples
- [Basic example](example.js)

## Contributing

Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## Conduct

It's important that this project contributes to a friendly, safe, and welcoming environment for all, particularly for folks that are historically underrepresented in technology. Read this project's [code of conduct](CONDUCT.md)

## Change log

Read about the changes to this project in [CHANGELOG.md](CHANGELOG.md). The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## Contact

- **chat** – You can chat about this project at [http://gitter.im/sethvincent/ask](http://gitter.im/sethvincent/ask)
- **issues** – Please open issues in the [issues queue](https://github.com/sethvincent/token-store/issues)
- **twitter** – [@sethdvincent](https://twitter.com/sethdvincent)
- **email** – Need in-depth support via paid contract? Send an email to sethvincent@gmail.com

## License

[ISC](LICENSE.md)
