const redis = require('redis')
const { REDIS_CONF } = require('../config/db')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

redisClient.on('error', err => {
    console.log({ err });
})

function set (key, value) {
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }
    redisClient.set(key, value, redis.print)
}

function get (key) {
    const promise = new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err)
                return
            }
            if (val === null) {
                resolve(null)
                return
            }
            try {
                // 如果是 JSON 格式，需要转换处理，如果不是，则报错，进入catch 中逻辑
                resolve(
                    JSON.parse(val)
                )
            } catch (ex) {
                resolve(val)
            }
            
        })
    })

    return promise
}

module.exports = {
    set,
    get
}
