function IDproducer() {
  let chars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  this.produceStudentID = function() {
    let studentID = "Stu";
    for (let i = 0; i < 5; i++) {
      studentID = studentID + chars[Math.floor(Math.random() * 10)];
    }

    return studentID;
  };

  this.produceTeacherID = function() {
    let teacherID = "Tea";
    for (let i = 0; i < 5; i++) {
      teacherID = teacherID + chars[Math.floor(Math.random() * 10)];
    }

    return teacherID;
  };

  this.produceCoachID = function() {
    let coachID = "Coa";
    for (let i = 0; i < 5; i++) {
      coachID = coachID + chars[Math.floor(Math.random() * 10)];
    }

    return coachID;
  };

  this.produceSchoolID = function() {
    let schoolID = "Sch";
    for (let i = 0; i < 5; i++) {
      schoolID = schoolID + chars[Math.floor(Math.random() * 10)];
    }

    return schoolID;
  };

  this.produceGymID = function() {
    let gymID = "Gym";
    for (let i = 0; i < 5; i++) {
      gymID = gymID + chars[Math.floor(Math.random() * 10)];
    }

    return gymID;
  };

  this.produceDeviceID = function() {
    let deviceID = "Dev";
    for (let i = 0; i < 5; i++) {
      deviceID = deviceID + chars[Math.floor(Math.random() * 10)];
    }

    return deviceID;
  };
}

module.exports = IDproducer;
