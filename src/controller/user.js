const loginCheck = (username, password) => {
    // 假数据
    if (username === 'xiaohua' && password === '123') {
        return true
    }
    return false
}

module.exports = {
    loginCheck
}
