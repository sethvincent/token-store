var assert = require('assert')
var createConfig = require('configuration-store')

module.exports = function tokenStore (options) {
  assert.equal(typeof options, 'object', 'options object is required')
  assert.equal(typeof options.filename, 'string', 'options.filename string is required')
  var conf = createConfig(options)

  var existing = conf.get()

  if (!existing.tokens) {
    conf.write({
      currentToken: null,
      tokens: []
    })
  }

  return {
    filepath: conf.filepath,
    get: get,
    set: set,
    has: has,
    current: current,
    delete: del,
    clear: clear,
    destroy: destroy
  }

  function set (data) {
    assert.equal(typeof data, 'object', 'data object is required')
    assert.equal(typeof data.token, 'string', 'data.token string is required')
    assert.equal(typeof data.server, 'string', 'data.server string is required')

    var tokens = conf.get('tokens')
    var found = false

    tokens = tokens.filter((item) => !!item).map(function (item) {
      if (item.server === data.server) {
        found = true
        return data
      } else {
        return item
      }
    })

    if (!found) {
      tokens.push(data)
    }

    conf.set('tokens', tokens)
    conf.set('currentToken', data)
  }

  function get (server) {
    var tokens = conf.get('tokens')

    if (!server) {
      return tokens
    }

    var token = tokens.find(function (item) {
      return item.server === server
    })

    if (!token) return false
    return token
  }

  function has (server) {
    return !!get(server)
  }

  function current (server) {
    if (!server) {
      return conf.get('currentToken')
    } else {
      var token = get(server)
      conf.set('currentToken', token)
      return conf.get('currentToken')
    }
  }

  function del (server) {
    assert.equal(typeof server, 'string', 'data.server string is required')

    var tokens = conf.get('tokens')
    var currentToken = conf.get('currentToken')

    tokens = tokens.map(function (item) {
      if (item && item.server !== server) {
        return item
      }
    }).filter((item) => !!item)

    if (currentToken && currentToken.server === server) {
      conf.set('currentToken', null)
    }

    conf.set('tokens', tokens)
  }

  function clear () {
    return conf.write({ currentToken: null, tokens: [] })
  }

  function destroy () {
    return conf.destroy()
  }
}
