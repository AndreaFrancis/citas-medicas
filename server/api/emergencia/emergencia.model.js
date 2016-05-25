'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Emergencia', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    fecha: DataTypes.DATE
  });
}
