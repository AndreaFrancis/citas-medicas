'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Usuario', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    usuario: DataTypes.STRING,
    password: DataTypes.STRING,
    rol: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['admin', 'asegurado', 'bioestadistico']]
      } 
    } 
    
  });
}
