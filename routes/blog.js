const router = require('koa-router')()
const { getList, getDetail, createBlog, updateBlog, deleteBlog } = require('../controller/blog')
const { ErrorModel, SuccessModel } = require('../model/resModel')

router.prefix('/api/blog')

// 博客列表
router.get('/list', async (ctx, next) => {
  const { query } = ctx
  const { author = '', keyword = '' } = query

  // 管理员界面
  if (ctx.query.isAdmin) {
    if (ctx.session.username === null) {
      ctx.body = new ErrorModel('未登录')
      return
    }
  }

  const result = await getList(author, keyword)

  ctx.body = new SuccessModel(result)
})

// 博客详情
router.get('/detail', async (ctx, next) => {
  const { id } = ctx.query

  const result = await getDetail(id)

  ctx.body = new SuccessModel(result || {})
})

// 创建新博客
router.post('/create', async (ctx, next) => {
  const { body } = ctx.request

  const result = await createBlog(body)
  ctx.body = new SuccessModel(result)
})

// 更新一条博客
router.post('/update', async (ctx, next) => {
  const { body } = ctx.request
  const { id } = ctx.query

  // 此时 result 是个Boolean值
  const result = await updateBlog(id, body)
  if (result) {
    ctx.body = new SuccessModel(result)
  } else {
    ctx.body = new ErrorModel('更新博客失败')
  }
})

// 软删除博客
router.get('/delete', async (ctx, next) => {
  const { id } = ctx.query
   // 此时 result 是个Boolean值
  const result = await deleteBlog(id)
  if (result) {
    ctx.body = new SuccessModel(result)
  } else {
    ctx.body = new ErrorModel('删除博客失败')
  }
})

module.exports = router
