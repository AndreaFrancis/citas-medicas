'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Medico', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombres: DataTypes.STRING,
    apellidos: DataTypes.STRING,
    matricula: DataTypes.STRING
  });
}
