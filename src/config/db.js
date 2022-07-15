// 环境变量
const env = process.env.NODE_ENV

// mysql 配置
let MYSQL_CONF
// redis 配置
let REDIS_CONF

if (env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'my_blog'
    }

    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
} else if (env === 'pro') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'my_blog'
    }

    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}
