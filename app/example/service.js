const {service,list} = require('../../utils')

const Model = require('./model')
const modelName = 'example'
let role = `role:${modelName}`

module.exports = function(options){
  //create
  this.add(`${role}, create:${modelName}`, async(args, done) => {
    service(args,done,async(params,query,body) => {
      const {name} = body

      if(!name) throw new Error('缺少字段')
      let record = await Model.create(body)

      return {
        type: 'data',
        data: record
      }
    })
  })
  //get
  this.add(`${role}, get:${modelName}`, async(args, done) => {
    service(args,done,async(params,query,body) => {
      const {id} = params

      let record = await Model.findById(id)

      return {
        type: 'data',
        data: record
      }
    })
  })
  //update
  this.add(`${role}, update:${modelName}`, async(args, done) => {
    service(args,done,async(params,query,body) => {

      body.updatedAt = Date.now()
      let record = await Model.findByIdAndUpdate(params.id,body)
      if(!record) throw new Error('无记录')

      return {
        type: 'success'
      }
    })
  })
  //del
  this.add(`${role}, del:${modelName}`, async(args, done) => {
    service(args,done,async(params,query,body) => {

      let record = await Model.findByIdAndDelete(params.id)
      if(!record) throw new Error('无记录')

      return {
        type: 'success'
      }
    })
  })
  //list
  this.add(`${role}, list:${modelName}`, async(args, done) => {
    service(args,done,async(params,query,body) => {

      let res = await list(Model,query,null)

      return {
        type: 'data',
        data: res.records,
        total: res.total
      }
    })
  })
  this.add(`${role}, listBySearch:${modelName}`, async(args, done) => {
    service(args,done,async(params,query,body) => {
      const {keyword} = params
      const reg = new RegExp(decodeURIComponent(keyword), 'i')
      const conditions = {
        $or: [
          { name: { $regex: reg } },
        ]
      }

      let res = await list(Model,query,conditions)

      return {
        type: 'data',
        data: res.records,
        total: res.total
      }
    })
  })
}
