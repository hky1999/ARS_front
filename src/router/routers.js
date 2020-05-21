/* eslint-disable */
import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/message',
    name: 'message',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    children: [
      {
        path: 'message_page',
        name: 'message_page',
        meta: {
          icon: 'md-notifications',
          title: '消息中心',
          hideInMenu: true
        },
        component: () => import('@/view/single-page/message/index.vue')
      }
    ]
  },
  {
    path: '/user_manage',
    name: '用户管理',
    meta: {
      icon: 'logo-buffer',
      title: '用户管理'
    },
    component: Main,
    children: [
      {
        path: 'user_all',
        name: '所有用户',
        meta: {
          icon: 'md-grid',
          title: '所有用户'
        },
        component: () => import('@/view/components/tables/usertables.vue')
      },
      {
        path: 'user_teacher',
        name: '教师',
        meta: {
          icon: 'md-grid',
          title: '教师'
        },
        component: () => import('@/view/components/tables/teacherTables.vue')
      },
      {
        path: 'user_student',
        name: '学生',
        meta: {
          icon: 'md-grid',
          title: '学生'
        },
        component: () => import('@/view/components/tables/studentTables.vue')
      },
      {
        path: 'user_admin',
        name: '管理员',
        meta: {
          icon: 'md-grid',
          title: '管理员'
        },
        component: () => import('@/view/components/tables/adminTables.vue')
      },
      {
        path: 'user_add',
        name: '添加新用户',
        meta: {
          hideInMenu: true,
          icon: 'md-grid',
          title: '添加新用户'
        },
        component: () => import('@/view/components/forms/user-info-form.vue')
      },
      {
        path: 'test',
        name: '测试页',
        meta: {
          hideInMenu: true,
          icon: 'md-grid',
          title: '测试页'
        },
        component: () => import('@/view/mypage/testPage.vue')
      }
    ]
  },
  {
    path: '/activity_management',
    name: '活动管理',
    meta: {
      icon: 'logo-buffer',
      title: '活动管理'
    },
    component: Main,
    children: [
      {
        path: 'activity_all',
        name: '所有活动',
        meta: {
          icon: 'md-grid',
          title: '所有活动'
        },
        component: () => import('@/view/components/tables/activitytables.vue')
      },
      {
        path: 'activity_auditing',
        name: '待审核活动',
        meta: {
          icon: 'md-grid',
          title: '待审核活动'
        },
        component: () => import('@/view/components/tables/activityauditingtables.vue')
      },
      {
        path: 'activity_approved',
        name: '审核通过活动',
        meta: {
          icon: 'md-grid',
          title: '审核通过活动'
        },
        component: () => import('@/view/components/tables/activityapprovedtables.vue')
      },
      {
        path: 'activity_reject',
        name: '已驳回活动',
        meta: {
          icon: 'md-grid',
          title: '已驳回活动'
        },
        component: () => import('@/view/components/tables/activityrejectedtables.vue')
      },
      {
        path: 'activity_end',
        name: '已结束活动',
        meta: {
          icon: 'md-grid',
          title: '已结束活动'
        },
        component: () => import('@/view/components/tables/activityendtables.vue')
      }
    ]
  },
  {
    path: '/post_management',
    name: '论坛管理',
    meta: {
      icon: 'logo-buffer',
      title: '论坛管理',
    },
    component: Main,
    children: [
      {
        path: 'post_all',
        name: '发帖管理',
        meta: {
          icon: 'md-grid',
          title: '发帖管理'
        },
        component: () => import('@/view/components/tables/postTables.vue')
      },
      {
        path: 'post_comment_all',
        name: '评论管理',
        meta: {
          icon: 'md-grid',
          title: '评论管理'
        },
        component: () => import('@/view/components/tables/postCommentTables.vue')
      }
    ]
  },
  {
    path: '/components',
    name: 'components',
    meta: {
      icon: 'logo-buffer',
      hideInMenu: true,
      title: '组件'
    },
    component: Main,
    children: [
      {
        path: 'tree_select_page',
        name: 'tree_select_page',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: '树状下拉选择器'
        },
        component: () => import('@/view/components/tree-select/index.vue')
      },
      {
        path: 'count_to_page',
        name: 'count_to_page',
        meta: {
          icon: 'md-trending-up',
          title: '数字渐变'
        },
        component: () => import('@/view/components/count-to/count-to.vue')
      },
      {
        path: 'drag_list_page',
        name: 'drag_list_page',
        meta: {
          icon: 'ios-infinite',
          title: '拖拽列表'
        },
        component: () => import('@/view/components/drag-list/drag-list.vue')
      },
      {
        path: 'drag_drawer_page',
        name: 'drag_drawer_page',
        meta: {
          icon: 'md-list',
          title: '可拖拽抽屉'
        },
        component: () => import('@/view/components/drag-drawer')
      },
      {
        path: 'org_tree_page',
        name: 'org_tree_page',
        meta: {
          icon: 'ios-people',
          title: '组织结构树'
        },
        component: () => import('@/view/components/org-tree')
      },
      {
        path: 'tree_table_page',
        name: 'tree_table_page',
        meta: {
          icon: 'md-git-branch',
          title: '树状表格'
        },
        component: () => import('@/view/components/tree-table/index.vue')
      },
      {
        path: 'cropper_page',
        name: 'cropper_page',
        meta: {
          icon: 'md-crop',
          title: '图片裁剪'
        },
        component: () => import('@/view/components/cropper/cropper.vue')
      },
      {
        path: 'tables_page',
        name: 'tables_page',
        meta: {
          icon: 'md-grid',
          title: '多功能表格'
        },
        component: () => import('@/view/components/tables/tables.vue')
      },
      {
        path: 'split_pane_page',
        name: 'split_pane_page',
        meta: {
          icon: 'md-pause',
          title: '分割窗口'
        },
        component: () => import('@/view/components/split-pane/split-pane.vue')
      },
      {
        path: 'markdown_page',
        name: 'markdown_page',
        meta: {
          icon: 'logo-markdown',
          title: 'Markdown编辑器'
        },
        component: () => import('@/view/components/markdown/markdown.vue')
      },
      {
        path: 'editor_page',
        name: 'editor_page',
        meta: {
          icon: 'ios-create',
          title: '富文本编辑器'
        },
        component: () => import('@/view/components/editor/editor.vue')
      },
      {
        path: 'icons_page',
        name: 'icons_page',
        meta: {
          icon: '_bear',
          title: '自定义图标'
        },
        component: () => import('@/view/components/icons/icons.vue')
      }
    ]
  },

  {
    path: '/tools_methods',
    name: 'tools_methods',
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'tools_methods_page',
        name: 'tools_methods_page',
        meta: {
          icon: 'ios-hammer',
          title: '工具方法',
          beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/tools-methods/tools-methods.vue')
      }
    ]
  },

  {
    path: '/directive',
    name: 'directive',
    meta: {
      hideInMenu: true,
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'directive_page',
        name: 'directive_page',
        meta: {
          icon: 'ios-navigate',
          title: '指令'
        },
        component: () => import('@/view/directive/directive.vue')
      }
    ]
  },
  {
    path: '/multilevel',
    name: 'multilevel',
    meta: {
      hideInMenu: true,
      icon: 'md-menu',
      title: '多级菜单'
    },
    component: Main,
    children: [
      {
        path: 'level_2_1',
        name: 'level_2_1',
        meta: {
          icon: 'md-funnel',
          title: '二级-1'
        },
        component: () => import('@/view/multilevel/level-2-1.vue')
      },
      {
        path: 'level_2_2',
        name: 'level_2_2',
        meta: {
          access: ['super_admin'],
          icon: 'md-funnel',
          showAlways: true,
          title: '二级-2'
        },
        component: parentView,
        children: [
          {
            path: 'level_2_2_1',
            name: 'level_2_2_1',
            meta: {
              icon: 'md-funnel',
              title: '三级'
            },
            component: () => import('@/view/multilevel/level-2-2/level-2-2-1.vue')
          },
          {
            path: 'level_2_2_2',
            name: 'level_2_2_2',
            meta: {
              icon: 'md-funnel',
              title: '三级'
            },
            component: () => import('@/view/multilevel/level-2-2/level-2-2-2.vue')
          }
        ]
      },
      {
        path: 'level_2_3',
        name: 'level_2_3',
        meta: {
          icon: 'md-funnel',
          title: '二级-3'
        },
        component: () => import('@/view/multilevel/level-2-3.vue')
      }
    ]
  },
  {
    path: '/argu',
    name: 'argu',
    meta: {
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'params/:id',
        name: 'params',
        meta: {
          icon: 'md-flower',
          title: route => `{{ params }}-${route.params.id}`,
          notCache: true,
          beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/argu-page/params.vue')
      },
      {
        path: 'query',
        name: 'query',
        meta: {
          icon: 'md-flower',
          title: route => `{{ query }}-${route.query.id}`,
          notCache: true
        },
        component: () => import('@/view/argu-page/query.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
