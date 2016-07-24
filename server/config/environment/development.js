'use strict';

// Development specific configuration
// ==================================
module.exports = {

  // Sequelize connection opions
  /*sequelize: {
    uri: 'sqlite://',
    options: {
      logging: false,
      storage: 'dev.sqlite',
      define: {
        timestamps: false
      }
    }
  },*/
  sequelize: {
    uri: 'mysql://root:root@173.194.255.216:3306/cosmil'
  },


  // Seed database on startup
  seedDB: true

};
