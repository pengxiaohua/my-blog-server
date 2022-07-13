#### router 和 controller
- router处理 **路由**的问题
- controller处理**数据**问题，可以在controller中做数据格式化处理

#### 路由 和 API
- API：前端和后端之间的一个术语
    - 一般会包含url(路由)、方法、输入、输出等
- 路由：API 的一部分
    - 后端系统内部的模块定义

#### nodejs连接mysql
- `insert into`, `delete`, `update`, `select`
- `NODE_ENV`环境变量
- 封装`exec`方法，API使用`exec`传入sql语句操作数据库

#### cookie
- 存在浏览器中的一段字符串（最大5KB）
- 跨域不共享
- 格式如 k1=v1;k2=v2;k3=v3; 可以存储结构化数据
- 每次发送http请求，会将请求域的 cookie 一起发送给server
- server 端可以修改 cookie 并返回给浏览器
- 浏览器中也可以通过js修改 cookie（在未设置 httpOnly 的情况下）

#### session
- cookie 中存储username，会保留用户信息，不安全
- 一般 cookie 中存储 userId，server 端对应查找相关 username
- 解决方案：session，即：server 端存储用户信息