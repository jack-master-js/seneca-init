const mongoose = require('mongoose')

//config
const config = require('./config')
const options = {
  useNewUrlParser: true
}
const url = `mongodb://${config.mongodb.username}:${config.mongodb.password}@${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.database}`

//mongoose设置
mongoose.connect(url,options) //建立链接
mongoose.Promise = global.Promise //将mongoose自行封装的promise，改为 ES6 标准
mongoose.set('useFindAndModify',false) //use native findOneAndUpdate()

//db
const db = mongoose.connection
db.on('error', console.error.bind(console, '连接错误信息:'))
db.once('open', () => { console.log(`链接 ${config.mongodb.database} 数据库成功！`) })
