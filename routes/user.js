const router = require('koa-router')()

const { ErrorModel, SuccessModel } = require('../model/resModel')
const { login } = require('../controller/user')

router.prefix('/api/user')

router.post('/login', async (ctx, next) => {
  const { username, password } = ctx.request.body
  const result = await login(username, password)
  const { username: name, realname } = result
  if (name) {
    ctx.session.username = name
    ctx.session.realname = realname

    ctx.body = new SuccessModel()
    return
  }
  ctx.body = new ErrorModel('登录失败')
})

module.exports = router
