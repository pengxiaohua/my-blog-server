const { exec } = require('../db/mysql')

const loginCheck = (username, password) => {
    const sql = `
        select username, realname from t_users where username='${username}'`

    return exec(sql).then(row => {
        return row[0] || {}
    })
}

module.exports = {
    loginCheck
}
