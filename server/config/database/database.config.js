/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/4/20 下午3:42
 * @Filename: database.config.js
 * @Function: export mongodb database url
 */

module.exports = {
  url: "mongodb://localhost/",
  database: "eer",
  options: { useNewUrlParser: true, useUnifiedTopology: true, keepAlive: 150 }
};
