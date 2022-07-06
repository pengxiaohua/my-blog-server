const  { getList, getDetail, createBlog, updateBlog, deleteBlog } = require('../controller/blog.js')
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
        const result = getList(author, keyword)
        return result.then(listData => new SuccessModel(listData))
    }

    // 获取博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        const result = getDetail(id)
        return result.then(data => new SuccessModel(data))
    }

    // 新建一篇博客
    if (method === 'POST' && req.path === '/api/blog/create') {
        const { body } = req
        // 暂无登录信息，使用假数据的 author
        const author = 'xiaohua'
        const result = createBlog({...body, author})
        return result.then(dataList => {
            return new SuccessModel(dataList)
        })
    }

    // 更新一篇博客
    if (method === 'POST' && req.path === '/api/blog/update') {
        const { body } = req
        const result = updateBlog(id, body)
        return result.then(isUpdated => {
            if (isUpdated) {
                return new SuccessModel()
            }
            return new ErrorModel('更新博客失败')
        })
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
