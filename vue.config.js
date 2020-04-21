/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/4/19 下午7:50
 * @Filename: vue.config.js
 * @Function: do nothing >_>
 */

const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

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
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("./src"))
      .set("components", resolve("./src/components"));
  }
};
