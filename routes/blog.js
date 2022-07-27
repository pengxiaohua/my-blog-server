const router = require('koa-router')()
const { getList } = require('../controller/blog')

router.prefix('/api/blog')

router.get('/list', async function (ctx, next) {
  const { query } = ctx
  const { author = '', keyword = '' } = query
  const result = await getList(author, keyword)

  ctx.body = {
    errno: 0,
    query,
    data: result
  }
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
