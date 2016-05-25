'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Asegurado', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombres: DataTypes.STRING,
    apellidos: DataTypes.STRING,
    matricula: DataTypes.STRING,
    historia: DataTypes.INTEGER,
    reserva_web: DataTypes.BOOLEAN
  });
}
