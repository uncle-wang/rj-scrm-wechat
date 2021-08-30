const path = require('path');

module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/variables/*.less')],
    },
  },
  devServer: {
    host: 'rj-scrm-1258927939.cos-website.ap-shanghai.myqcloud.com',
    port: 80, // 端口
    https: false,
    proxy: {
      '/cgi-bin': {
        target: 'https://qyapi.weixin.qq.com',
        changeOrigin: true
      }
    }
  }
};
