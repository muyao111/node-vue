module.exports = {
  // 默认输出路径，不要放在dist里，直接放在指定路径
  outputDir: __dirname + '/../server/public/app',
  // 开发环境和生产环境都用/，无论如何都生成到根地址
  // publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
}
