const path = require('path')

module.exports = {
  lintOnSave: false,
  // 基本路径
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
  // webpack配置
  chainWebpack: config => {
    // 设置静态目录别名
    config
      .resolve
      .alias
      .set('public', path.join(__dirname, 'public'))
  },
  // webpack-dev-server 相关配置
  devServer: {
    open: true,
    proxy: 'http://localhost:3000/', // 设置代理
    overlay: {
      warnings: true,
      errors: true
    }
  }
}
