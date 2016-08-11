'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define("User", {
    id: {
        type:  DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
    password: DataTypes.STRING,
  }, 
  {
    freezeTableName: true
  },
  {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
};