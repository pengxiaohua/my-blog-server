#### 接口设计

| Description | Route | Method | Data | Comment |
| ----------- | ----- | ------ | ---- | ------- |
| 获取博客列表 | /api/blog/list | GET | author:string, keyword: string | 参数为空，则不进行相关字段过滤查询 |
| 获取一篇博客详情 | /api/blog/detail | GET | id: number | - |
| 新增博客 | /api/blog/create |  POST | - | - |
| 更新一篇博客 | /api/blog/update | POST | id: number | postData中有更新的内容 | 
| 删除一篇博客 | /api/blog/delete | POST | id: number | - |
| 登录 | /api/user/login | POST | - | postData中有用户名和密码 | 