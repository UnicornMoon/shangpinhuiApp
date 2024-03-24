const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports={
  //关闭eslint
  lintOnSave:false,
  //代理跨域  浏览器与浏览器之间有跨域问题 服务器和服务器之间没有
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        // pathRewrite: { '^/api': '' },
      },
    },
  },
}