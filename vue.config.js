const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
  // devServer: {
  //   proxy: { // 配置跨域
  //     '/specificApi': {
  //       target: 'http://localhost:5000/api', // 填写请求的目标地址
  //       ws: true,
  //       changOrigin: true, // 允许跨域
  //       pathRewrite: {
  //         '^/specificApi': '' // 请求的时候使用这个specificApi就可以
  //       }
  //     }
  //   }
  // }
})
