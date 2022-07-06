const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
    // 1=1 是占位条件
    let sql = `select * from t_blogs where 1=1 `
    if (author) {
        sql += `and author='${author}'`
    }
    if (keyword) {
        sql += `and title like '%${keyword}%'`
    }

    sql += `order by create_time desc;`

    // 返回promise
    return exec(sql)
}

const getDetail = (id) => {
    const sql = `select * from t_blogs where id='${id}'`
    // 返回promise
    return exec(sql).then(rows => rows[0])
}

const createBlog = (blogData = {}) => {
    // blogData是一个博客对象数据
    const { title, content, author } = blogData
    const create_time = Date.now()

    const sql = `
        insert into t_blogs (title, content, author, create_time)
        values ('${title}', '${content}', '${author}', ${create_time})
    `
    return exec(sql).then(data => {
        const { insertId } = data
        return { id: insertId }
    })
}

const updateBlog = (id, blogData = {}) => {
    // id是更新博客的id
    // blogData是一个博客对象数据
    return true
}

const deleteBlog = (id) => {
    // id是更新博客的id
    // blogData是一个博客对象数据
    return true
}

module.exports = {
    getList,
    getDetail,
    createBlog,
    updateBlog,
    deleteBlog
}
