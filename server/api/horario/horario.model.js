'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Horario', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    fecha: DataTypes.DATE,
    fichas: DataTypes.INTEGER,
    fichas_actual: DataTypes.INTEGER,
    minutos: DataTypes.INTEGER,
    consultorio: DataTypes.STRING,
    hora_inicio: DataTypes.DATE,
    hora_fin: DataTypes.DATE
  });
}
