const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// 获取cookie郭琦时间
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + ( 7 * 24 * 60 * 60 * 1000))
    console.log('d.toGMTString(): ', d.toGMTString());
    return d.toGMTString()
}

const handleUserRouter = (req, res) => {
    const method = req.method // GET POST

    // 登录处理
    if (method === 'GET' && req.path === '/api/user/login') {
        const { username, password } = req.query
        const result = login(username, password)
        return result.then(data => {
            const { username } = data
            if (username) {
                // 操作cookie
                res.setHeader('Set-Cookie', `username=${username}; path=/; httpOnly; expires=${getCookieExpires()}`)

                return new SuccessModel()
            }
            return new ErrorModel('登录失败')
        })
    }
}

module.exports = handleUserRouter
