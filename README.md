## Undone

~~活动发布情况 审核中未显示完全~~

标志改成矢量图

使用用户id无法搜索 活动同样无法使用id进行搜索

~~使用身份查询时要不要对输入进行限制~~

~~活动类型，需要根据字段值显示汉字~~

活动发布者用id不太合适吧，个人感觉用工号/学号更合适？   下一版本解决

~~页面缩放问题，浏览器下方未出现左右滑动条，必须缩到很小才能看到全部页面~~

~~没有退出登陆的功能~~

~~加载数据的速度很慢页面会出现暂时空白（虽然我觉得这个问题咱们解决不了）~~

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

