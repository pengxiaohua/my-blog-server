#### 数据库设计

#### t_blogs

| Name        | Type        | Primary Key | Auto Increment | Comments                                    |
| ----------- | ----------- | ----------- | -------------- | ------------------------------------------- |
| id          | INT         | Y           | Y              | 自增 BLOG ID                                |
| title       | VARCHAR(50) | N           | N              | BLOG 标题                                   |
| content     | LONGTEXT    | N           | N              | BLOG 内容                                   |
| author      | VARCHAR(20) | N           | N              | BLOG 作者                                   |
| create_time | BIGINT      | N           | N              | BLOG 创建时间戳                             |
| state       | INT         | N           | N              | BLOG 软删除状态，1 默认值，未删除，0 已删除 |

#### t_users

| Name     | Type        | Primary Key | Auto Increment | Comments                                    |
| -------- | ----------- | ----------- | -------------- | ------------------------------------------- |
| id       | INT         | Y           | Y              | 自增 BLOG ID                                |
| username | VARCHAR(20) | N           | N              | BLOG 标题                                   |
| password | VARCHAR(20) | N           | N              | BLOG 内容                                   |
| realname | VARCHAR(10) | N           | N              | BLOG 作者                                   |
| state    | INT         | N           | N              | BLOG 软删除状态，1 默认值，未删除，0 已删除 |
