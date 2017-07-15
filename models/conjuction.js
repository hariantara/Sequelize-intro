'use strict';
module.exports = function(sequelize, DataTypes) {
  var conjuction = sequelize.define('conjuction', {
    studentId: DataTypes.INTEGER,
    subjectID: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return conjuction;
};