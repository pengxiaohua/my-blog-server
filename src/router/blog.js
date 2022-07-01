const  { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog.js')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    const method = req.method // GET POST
    const { id } = req.query

    // 获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        const { query: {
            author = '',
            keyword = ''
        }} = req
        const listData = getList(author, keyword)
        return new SuccessModel(listData)
    }

    // 获取博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        const data = getDetail(id)
        return new SuccessModel(data)
    }

    // 新建一篇博客
    if (method === 'POST' && req.path === '/api/blog/create') {
        const { body } = req
        const data = newBlog(body)
        return new SuccessModel(data)
    }

    // 更新一篇博客
    if (method === 'POST' && req.path === '/api/blog/update') {
        const { body } = req
        const result = updateBlog(id, body)
        if (result) {
            return new SuccessModel()
        }
        return new ErrorModel('更新博客失败')
        
    }

    // 删除一篇博客
    if (method === 'POST' && req.path === '/api/blog/delete') {
        const result = deleteBlog(id)
        if (result) {
            return new SuccessModel()
        }
        return new ErrorModel('删除博客失败')
    }
}

module.exports = handleBlogRouter
