## Undone

#### 登录token

#### 用户管理

* 将新增用户放在列表页面，点击弹出模态框
  * **已解决，但是还存在问题**, 需要解决格式处理以及密码一致性检查
* 编辑按钮与新增共用，？？

#### 活动管理

* 活动通过与拒绝
  * **已解决**
* 查看活动详情页面（模态框实现吧）
  * **已解决**
* 

#### 用户消息模块的设计

* alpha版不做？

## DONE

src/api/data.js

src/api/user.js

src/router/router.js

src/view/tables/*tables.vue

用户增加删除
用户信息查看
（修改还没
活动信息查看
活动审核
活动驳回

## Features

- Login / Logout
- Permission Authentication
    - A list of filters
    - Permission to switch
- i18n
- Components
    - Rich Text Editor
    - Markdown Editor
    - City Cascader
    - Photos preview and edit
    - Draggable list
    - File upload
    - Digital gradient
    - split-pane
- Form
    - The article published
    - Workflow
- Table
    - Drag-and-drop sort
    - Searchable form
    - Table export data
        - Export to Csv file
        - Export to Xls file
    - Table to picture
- Error Page
    - 403
    - 404
    - 500
- Router
    - Dynamic routing
    - With reference page
- Theme
- Shrink the sidebar
- Tag navigation
- Breadcrumb navigation
- Full screen / exit full screen
- Lock screen
- The message center
- Personal center

## Getting started
```bush
# clone the project
git clone https://github.com/iview/iview-admin.git

// install dependencies
npm install

// develop
npm run serve
```

## Build
```bush
npm run build
```

## License
[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2016-present, TalkingData

