'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip:     process.env.OPENSHIFT_NODEJS_IP ||
          process.env.IP ||
          undefined,

  // Server port
  port:   process.env.OPENSHIFT_NODEJS_PORT ||
          process.env.PORT ||
          8080,

  sequelize: {
    sequelize: {
      //Cadena para correr localmente
      //uri: 'mysql://root:root@localhost:3306/cosmil'
      uri: 'mysql://root:root@173.194.106.24:3306/cossmil'
      //Cadena para conectar con la nube
      //uri: 'mysql://root:root@:173.194.242.46:3306/cossmil'
    },
  }
};
