const qs = require('querystringify')

const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const { get, set } = require('./src/db/redis.js')
const { access } = require('./src/util/log')

// 获取cookie郭琦时间
const getCookieExpires = () => {
    const d = new Date()
    // 7天后过期
    d.setTime(d.getTime() + ( 7 * 24 * 60 * 60 * 1000))
    return d.toGMTString()
}

// 处理 Request data
const getRequestData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData =''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise
}

const serverHandle = (req, res) => {
    // 记录 access log
    // access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)

    res.setHeader('Content-type', 'application/json')

    // 获取path
    const url = req.url
    req.path = url.split('?')[0]

    // 解析 query
    req.query = qs.parse(url.split('?')[1])

    // 解析cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return
        }
        const arr = item.split('=')
        const key = arr[0].trim()
        const value = arr[1].trim()
        req.cookie[key] = value
    })

    // 使用 redis 解析 session
    // 基本思路就是：给 req 的 session 赋值
    let needSetCookie = false
    let userId = req.cookie.userId
    
    if (!userId) {
        needSetCookie = true
        // cookie 中不存在 userId的情况
        userId = `${Date.now()}_${Math.random()}`
        // 初始化 redis 中的 session 值
        set(userId, {})
        
    }
    // 获取 session
    req.sessionId = userId
    get(req.sessionId).then(sessionData => {
        if (sessionData === null) {
            //初始化 redis 中的 session 值
            set(req.sessionId, {})
            // 设置session
            req.session = {}
        } else {
            // 设置session
            req.session = sessionData
        }

        // 处理 Request data
        return getRequestData(req)
    })
    .then(postData => {
        req.body = postData

        // 处理 blog 的路由
        const blogResult = handleBlogRouter(req, res)
        if (blogResult) {
            if (needSetCookie) {
                res.setHeader('Set-Cookie', `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
            }
            blogResult.then(blogData => {
                res.end(JSON.stringify(blogData))
            })
            return
        }

        // 处理 user 路由
        const userResult = handleUserRouter(req, res)
        if (userResult) {
            if (needSetCookie) {
                res.setHeader('Set-Cookie', `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
            }
            userResult.then(userData => {
                res.end(JSON.stringify(userData))
            })
            return
        }

        // 未名中路由，404
        res.writeHead(404, {'Content-type': 'text/plain'})
        res.write('404 NOT FOUND\n')
        res.end()
    })
}

module.exports = serverHandle
