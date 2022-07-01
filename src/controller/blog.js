const getList = (author, keyword) => {
    // 先返回假数据
    return [
        {
            id: 1,
            title: '标题1',
            content: '内容1',
            createTime: 1656438503272
        },
        {
            id: 2,
            title: '标题2',
            content: '内容2',
            createTime: 1656438503252
        },
    ]
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

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog
}
