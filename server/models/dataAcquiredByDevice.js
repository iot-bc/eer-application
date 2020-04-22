function DataAcquiredByDevice() {
  var testData; //暂时就用String类型测一下

  this.setTestData = function(testData) {
    this.testData = testData;
  };

  this.getTestData = function() {
    return this.testData;
  };
}
module.export = DataAcquiredByDevice;
