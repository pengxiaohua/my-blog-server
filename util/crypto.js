const crypto = require('crypto')

// 密钥
const SECRET_KEY = 'dfSaJ#fd3f4_'

// md5 加密
function getMd5(content) {
    const md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')
}

// 加密函数
function genPassword(password) {
    const str = `password=${password}&key=${SECRET_KEY}`
    return getMd5(str)
}

module.exports = {
    genPassword
}
