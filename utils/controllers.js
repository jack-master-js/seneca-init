module.exports = function(_this,name,map) {
  const role = `role:${name}`
  const routes = {
    pin: `${role}, if:*`,
    prefix: `/${name}`,
    map
  }
  //init
  _this.add(`init:${name}`, function (msg, res) {
    _this.act('role:web', {routes}, res)
  })

  for (const mapKey in map) {
    generator(_this,name,role,mapKey)
  }

}

function generator(_this,name,role,method) {
  _this.add(`${role}, if:${method}`, function (msg, res) {
    const {params,query,body} = msg.args
    _this.act(`${role}, ${method}:${name}`, {params,query,body}, res)
  })
}
