'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Persona', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombres: DataTypes.STRING,
    apaterno: DataTypes.STRING,
    amaterno: DataTypes.STRING,
    fecha_nacimineto: DataTypes.DATE,
    genero: DataTypes.STRING
  });
}
