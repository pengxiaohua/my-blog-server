const router = require('koa-router')()

router.prefix('/api/user')

router.post('/login', async function (ctx, next) {
  const { username, password } = ctx.request.body
  ctx.body = {
    errno: 0,
    username,
    password
  }
})

router.get('/bar', async function (ctx, next) {
  const { viewCount } = ctx.session
  console.log({ viewCount });
  if (ctx.session.viewCount === null) {
    ctx.session.viewCount = 0
  }
  ctx.session.viewCount++

  ctx.body = {
    errno: 0,
    viewCount
  }
})

module.exports = router
