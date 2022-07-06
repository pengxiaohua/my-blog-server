// 环境变量
const env = process.env.NODE_ENV

// 创建连接对象
let MYSQL_CONF

if (env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'my_blog'
    }
} else if (env === 'pro') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'my_blog'
    }
}

module.exports = {
    MYSQL_CONF
}
