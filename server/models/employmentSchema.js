const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let employmentSchema = new Schema({
  studentID: {
    type: String,
    required: true
  },

  instructorID: {
    type: String,
    required: true
  }
});

employmentSchema.methods.setStudentID = function(studentID) {
  this.studentID = studentID;
};

employmentSchema.methods.getStudentID = function() {
  return this.studentID;
};

employmentSchema.methods.setInstructorID = function(instructorID) {
  this.instructorID = instructorID;
};

employmentSchema.methods.getInstructorID = function() {
  return this.instructorID;
};

let Employment = mongoose.model("Employment", employmentSchema);

module.exports = Employment;
