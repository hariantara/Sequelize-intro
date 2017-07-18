'use strict';
module.exports = function(sequelize, DataTypes) {
  var conjuction = sequelize.define('conjuction', {
    studentId: DataTypes.INTEGER,
    subjectID: DataTypes.INTEGER
  });

  conjuction.associate = (models) =>{
    conjuction.hasMany(models.Subject,{onDelete: 'CASCADE'})
    conjuction.hasMany(models.Students,{onDelete: 'CASCADE'})
  }

  return conjuction;
};
