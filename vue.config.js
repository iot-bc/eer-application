/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/4/19 下午7:50
 * @Filename: vue.config.js
 * @Function: do nothing >_>
 */

module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
