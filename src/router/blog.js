const  { getList, getDetail, newBlog } = require('../controller/blog.js')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    const method = req.method // GET POST
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
        const {id} = req.query
        const data = getDetail(id)
        return new SuccessModel(data)
    }

    // 新建一篇博客
    if (method === 'POST' && req.path === '/api/blog/create') {
        const {body} = req
        const data = newBlog(body)
        return new SuccessModel(data)
    }

    // 删除一篇博客
    if (method === 'POST' && req.path === '/api/blog/delete') {
        return {
            msg: '这是删除博客的接口'
        }
    }
}

module.exports = handleBlogRouter
