const controllers = require('../../utils/controllers')

const name = 'example'
const map = {
  create: { POST: true },
  get: { GET: true, suffix: '/:id' },
  update: { PUT: true, suffix: '/:id' },
  del: { DELETE: true, suffix: '/:id' },
  list: { GET: true},
  listBySearch: { GET: true, suffix: '/:keyword'},
}

module.exports = function(options) {
  controllers(this,name,map)
  return {name}
}
