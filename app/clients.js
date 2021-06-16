module.exports = function(options) {
  this
    .client({type: 'tcp', pin: 'role:example'})
    .use('./example/controller')
}
