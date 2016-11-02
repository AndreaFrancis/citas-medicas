'use strict';

// Development specific configuration
// ==================================
module.exports = {
  sequelize: {
    //Cadena para correr localmente
    //uri: 'mysql://root:root@localhost:3306/cosmil'
    //Cadena para conectar con la nube
    uri: 'mysql://root:root@173.194.106.24:3306/cossmil'
  },
  seedDB: true
};
