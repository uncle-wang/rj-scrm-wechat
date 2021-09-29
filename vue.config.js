const path = require('path');

module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/variables/*.less')],
    },
  },
  devServer: {
    host: 'scrm.client.deansel.com',
    port: 80, // 端口
    https: false,
    proxy: {
      '/api': {
        target: 'http://1.117.196.125:9500',
        changeOrigin: true,
        pathRewrite: { '^/api': '/' },
      },
    }
  }
};
