const xss = require('xss')

const { exec } = require('../db/mysql')

// 获取博客列表
const getList = async (author, keyword) => {
    // 1=1 是占位条件
    let sql = `select * from t_blogs where state=1 `
    if (author) {
        sql += `and author='${author}'`
    }
    if (keyword) {
        sql += `and title like '%${keyword}%'`
    }

    sql += `order by create_time desc;`

    // 返回promise
    return  await exec(sql)
}

// 获取博客详情
const getDetail = async (id) => {
    const sql = `select * from t_blogs where id=${id} and state=1`
    // 返回promise
    const rows = await exec(sql)
    return rows[0]
}

// 创建新博客
const createBlog = async (blogData = {}) => {
    // blogData是一个博客对象数据
    const title = xss(blogData.title)
    const content = xss(blogData.content)
    const { author } = blogData
    const create_time = Date.now()

    const sql = `
        insert into t_blogs (title, content, author, create_time)
        values ('${title}', '${content}', '${author}', ${create_time})
    `
    const data = await exec(sql)
    return {
        id: data.insertId
    }
}

// 更新博客
const updateBlog = async (id, blogData = {}) => {
    // id是更新博客的id
    // blogData是一个博客对象数据
    const title = xss(blogData.title)
    const content = xss(blogData.content)
    const sql = `
        update t_blogs set title='${title}',content='${content}' where id=${id} and state=1
    `
    const updateDate = await exec(sql)

    const { affectedRows } = updateDate
    if (affectedRows > 0) {
        return true
    }
    return false
}

// 软删除博客，修改state
const deleteBlog = async (id) => {
    // id是更新博客的id
    // 软删除，修改state状态
    const sql = `
        update t_blogs set state=0 where id=${id}
    `
    const deleteDate = await exec(sql)
    const { affectedRows } = deleteDate
    if (affectedRows > 0) {
        return true
    }
    return false
}

module.exports = {
    getList,
    getDetail,
    createBlog,
    updateBlog,
    deleteBlog
}
