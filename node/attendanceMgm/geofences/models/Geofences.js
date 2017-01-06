var Sequelize = require('../../common/MySQLConnection').Sequelize;
var sequelizeConn = require('../../common/MySQLConnection').sequelizeConn;

var Geofence = sequelizeConn.define('geofences', {
  geofence_id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  geo_name: {
    type: Sequelize.STRING(50),
    allowNull: false
  },  
  status: {
    type: Sequelize.STRING(45),
    allowNull: false,
    defaultValue: 'ACTIVE'
  },
  created_by: {
    type: Sequelize.STRING(45)    
  },  
  updated_by: {
    type: Sequelize.STRING(45),
  }
});

// create table if not exist
Geofence.sync({force: false}).then(function () {
  return;
});

module.exports.Geofence = Geofence;




