'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Asegurado', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    grado: DataTypes.STRING,
    fuerza: DataTypes.STRING,
    tipo_asegurado: DataTypes.STRING,
    matricula: DataTypes.STRING
  });
}
