const seneca = require('seneca')({debug:{undead:true}})
const senecaWeb = require('seneca-web')
const Koa = require('koa')
const Router = require('koa-router')

const main = new Koa()

const senecaConfig = {
  adapter: require('seneca-web-adapter-koa2'),
  context: Router()
}

const port = process.env.PORT || 7004

seneca
  .use(senecaWeb, senecaConfig)
  .use('./clients')
  .ready(() => {
    const router = seneca.export('web/context')()
    router
      .get('/',(ctx, next) => {
        ctx.body = 'Hi there, You need help?'
      })
    main.use(router.routes())
    main.use(router.allowedMethods())
    main.listen(port,() => { console.log(`server started on: http://localhost:${port}`) })
  })
