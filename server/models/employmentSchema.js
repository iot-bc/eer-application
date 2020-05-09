const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let employmentSchema = new Schema({
  _idMember: {
    type: String,
    required: true
  },

  _idTeacher: {
    type: String,
    required: true
  }
});

employmentSchema.methods.set_idMember = function(_idMember) {
  this._idMember = _idMember;
};

employmentSchema.methods.get_idMember = function() {
  return this._idMember;
};

employmentSchema.methods.set_idTeacher = function(_idTeacher) {
  this._idTeacher = _idTeacher;
};

employmentSchema.methods.get_idTeacher = function() {
  return this._idTeacher;
};

let Employment = mongoose.model("Employment", employmentSchema);

module.exports = Employment;
