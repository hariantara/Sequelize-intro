'use strict';
module.exports = function(sequelize, DataTypes) {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING,
    conjuctionId: DataTypes.INTEGER
  });

  Subject.associate = (models) =>{
    Subject.hasMany(models.Teacher);
    Subject.belongsToMany(models.Students,{through: models.conjuction, foreignKey: 'subjectID', onDelete: 'CASCADE'});
  }



  return Subject;
};
