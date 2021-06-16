const seneca = require('seneca')()
require('../db')
seneca
  .use('service')
  .listen({type: 'tcp', pin: 'role:example'})

