export default {
  /**
   * @description 配置显示在浏览器标签的title
   */
  title: 'ARS-web',
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
  useI18n: false,
  /**
   * @description api请求基础路径
   */
  baseUrl: {
    dev: 'https://www.easy-mock.com/mock/5add9213ce4d0e69998a6f51/iview-admin/',
    pro: 'https://produce.com',
    local: 'http://114.116.48.170:8080/'
    // local: 'http://localhost:8000/'
  },
  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homeName: 'home',
  /**
   * @description 需要加载的插件
   */
  plugin: {
    'error-store': {
      showInHeader: true, // 设为false后不会在顶部显示错误日志徽标
      developmentOff: true // 设为true后在开发环境不会收集错误信息，方便开发中排查错误
    }
  }
  // /**
  //  * 跨域
  //  */
  // assetsSubDirectory: 'static',
  // assetsPublicPath: '/',
  // proxyTable: {
  //   '/api': {
  //     target: 'http://114.115.181.247:8080/', // 设置你调用的接口域名和端口号 别忘了加http
  //     changeOrigin: true, // 如果需要跨域
  //     pathRewrite: {
  //       '^/api': 'http://114.115.181.247:8080/'// 调用接口直接写‘/api/user/add’即可
  //     }
  //   }
  // }
}
