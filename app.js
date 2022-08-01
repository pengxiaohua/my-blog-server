const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const morgan = require('koa-morgan')
const path = require('path')
const fs = require('fs')

const user = require('./routes/user')
const blog = require('./routes/blog')
const { REDIS_CONF } = require('./config/db')

// error handler
onerror(app)

// 注册中间件
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// logger middleware: morgan
const ENV = process.env.NODE_ENV
if (ENV !== 'production') {
  // 非线上环境
  app.use(morgan('dev'))
} else {
  // 线上环境
  const logFileName = path.join(__dirname, 'logs', 'access.log')
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'
  })
  app.use(morgan('combined', {
    stream: writeStream
  }));
}

// session 配置, 加密串
app.keys = ['dfSaJ#fd3f4_']

app.use(session({
  // 配置 cookie
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  },
  // 配置 redis
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))

// 路由
app.use(user.routes(), user.allowedMethods())
app.use(blog.routes(), blog.allowedMethods())

// 处理错误
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
