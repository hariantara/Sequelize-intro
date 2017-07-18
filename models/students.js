'use strict';
module.exports = function(sequelize, DataTypes) {
  var Students = sequelize.define('Students', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    conjuctionId: DataTypes.INTEGER
  });

  Students.associate = (models) =>{
    Students.belongsToMany(models.Subject, {through: models.conjuction, foreignKey: 'studentId', onDelete: 'CASCADE'});
  }

  return Students;
};
