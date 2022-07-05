const mysql = require('mysql')

// 创建连接对象
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '19910220',
    port: '3306',
    database: 'my_blog'
})

// 开始连接
con.connect();

// 执行 sql 语句
const sql = 'select * from t_users;';
con.query(sql, (err, result) => {
    if (err) {
        console.log(err)
        return
    }
    console.log(result)
});

// 断开连接
con.end();
