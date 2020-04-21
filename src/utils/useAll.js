/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/4/20 下午8:48
 * @Filename: useAll.js
 * @Function: do nothing >_>
 */

module.exports = function(instance, components) {
  components.forEach(component => {
    instance.use(component);
  });
};
