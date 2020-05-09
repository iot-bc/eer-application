const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let organizationSchema = new Schema({
  orgID: {
    type: String,
    required: true,
    unique: true
  },

  orgName: {
    type: String,
    required: true
  }
});

organizationSchema.methods.setOrgID = function(orgID) {
  this.orgID = orgID;
};

organizationSchema.methods.getOrgID = function() {
  return this.orgID;
};

organizationSchema.methods.setOrgName = function(orgName) {
  this.orgName = orgName;
};

organizationSchema.methods.getOrgName = function() {
  return this.orgName;
};

let Organization = mongoose.model("Organization", organizationSchema);

module.exports = Organization;
