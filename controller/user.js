const { exec, escape } = require('../db/mysql')
const  { genPassword } = require('../util/crypto')

const login = async (username, password) => {
    username = escape(username)
    // 生成加密密码
    password = escape(genPassword(password))

    const sql = `
        select * from t_users where username='${username}' and password='${password}'`

    const rows = await exec(sql)
    return rows[0] || {}
}

module.exports = {
    login
}
