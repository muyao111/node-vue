module.exports = {
  // 默认输出路径，不要放在dist里，直接放在指定路径
  outputDir: __dirname + '/../server/public/admin',
  // 开发环境用/，生产环境用/admin/
  publicPath: process.env.NODE_ENV === 'production' ? '/admin/' : '/',
}
