const { exec } = require('../db/mysql')

const login = (username, password) => {
    const sql = `
        select * from t_users where username='${username}' and password='${password}'`

    return exec(sql).then(row => {
        return row[0] || {}
    })
}

module.exports = {
    login
}
