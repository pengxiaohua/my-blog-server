const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
    const method = req.method // GET POST

    // 登录
    if (method === 'GET' && req.path === '/api/user/login') {
        const { username, password } = req.query
        const result = login(username, password)
        return result.then(data => {
            const { username } = data
            if (username) {
                // 操作cookie
                res.setHeader('Set-Cookie', `username=${username}; path=/`)

                return new SuccessModel()
            }
            return new ErrorModel('登录失败')
        })
    }
}

module.exports = handleUserRouter
