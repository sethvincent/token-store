var tokenStore = require('./index')

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

current = tokens.current()
console.log('\nnew current token:\n', current)

/* list all tokens */
console.log('\nall tokens:\n', tokens.get())

/* set current token from */
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
