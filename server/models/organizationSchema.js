const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let organizationSchema = new Schema({
  organizationID: {
    type: String,
    required: true,
    unique: true
  },

  organizationName: {
    type: String,
    required: true
  },

  organizationType: {
    type: String,
    required: true,
    enum: ["school", "gym"]
  }
});

organizationSchema.methods.setOrganizationID = function(organizationID) {
  this.organizationID = organizationID;
};

organizationSchema.methods.getOrganizationID = function() {
  return this.organizationID;
};

organizationSchema.methods.setOrganizationName = function(organizationName) {
  this.organizationName = organizationName;
};

organizationSchema.methods.getOrganizationName = function() {
  return this.organizationName;
};

organizationSchema.methods.setOrganizationType = function(organizationType) {
  this.organizationType = organizationType;
};

organizationSchema.methods.getOrganizationType = function() {
  return this.organizationType;
};

let Organization = mongoose.model("Organization", organizationSchema);

module.exports = Organization;
