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
    // 先返回假数据
    return {
        id: 1,
        title: '标题1',
        content: '内容1',
        createTime: 1656438503252,
        author: 'pengxiaohua'
    }
}

const newBlog = (blogData = {}) => {
    // blogData是一个博客对象数据
    console.log({blogData});
    return {
        id: 3, // 表示新建博客的id
    }
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
    newBlog,
    updateBlog,
    deleteBlog
}
