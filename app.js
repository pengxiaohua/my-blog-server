const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const qs = require('querystringify')

// 获取cookie郭琦时间
const getCookieExpires = () => {
    const d = new Date()
    // 7天后过期
    d.setTime(d.getTime() + ( 7 * 24 * 60 * 60 * 1000))
    console.log('d.toGMTString(): ', d.toGMTString());
    return d.toGMTString()
}

// session 数据
const SESSION_DATA = {}

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

    let needSetCookie = false
    let userId = req.cookie.userId
    // 解析 session
    // cookie 中存在 userId的情况
    if (userId) {
        if (!SESSION_DATA.userId) {
            SESSION_DATA.userId = {}
        }
    } else {
        // cookie 中不存在 userId的情况
        userId = `${Date.now()}_${Math.random()}`
        SESSION_DATA.userId = {}
        needSetCookie = true
    }
    req.session = SESSION_DATA.userId
    
    // 处理 Request data
    getRequestData(req).then(postData => {
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
