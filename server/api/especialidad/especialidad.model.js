'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Especialidad', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: DataTypes.STRING
  });
}
