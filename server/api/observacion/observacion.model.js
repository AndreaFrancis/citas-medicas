'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Observacion', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    motivo: DataTypes.STRING,
    fecha_inicio: DataTypes.DATE,
    fecha_fin: DataTypes.DATE
  });
}
