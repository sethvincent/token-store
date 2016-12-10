var test = require('tape')
var tokenStore = require('../index')

test('get and set', function (t) {
  var tokens = tokenStore({ filename: 'tokenstoretest' })

  tokens.set({
    server: 'http://127.0.0.1:3322',
    token: 'ok'
  })

  t.equal(tokens.get('http://127.0.0.1:3322').token, 'ok')
  t.equal(tokens.current().token, 'ok')
  tokens.destroy()
  t.end()
})

test('has & set current', function (t) {
  var tokens = tokenStore({ filename: 'tokenstoretest' })

  tokens.set({
    server: 'http://127.0.0.1:3322',
    token: 'ok'
  })

  t.ok(tokens.has('http://127.0.0.1:3322'))
  if (tokens.has('http://127.0.0.1:3322')) {
    var current = tokens.current('http://127.0.0.1:3322')
    t.ok(current)
  }
  tokens.destroy()
  t.end()
})

test('list all and delete', function (t) {
  var tokens = tokenStore({ filename: 'tokenstoretest' })

  tokens.set({
    server: 'http://127.0.0.1:1111',
    token: 'ok'
  })

  tokens.set({
    server: 'http://127.0.0.1:2222',
    token: 'ok'
  })

  var all = tokens.get()
  t.ok(all)
  t.equal(all.length, 2)
  tokens.delete('http://127.0.0.1:2222')

  all = tokens.get()
  t.ok(all)
  t.equal(all.length, 1)

  tokens.destroy()
  t.end()
})
