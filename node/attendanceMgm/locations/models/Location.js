var Sequelize = require('../../common/MySQLConnection').Sequelize;
var sequelizeConn = require('../../common/MySQLConnection').sequelizeConn;

var Location = sequelizeConn.define('location', {
  location_id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  user_id: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  capture_date: {
    type: Sequelize.DATE,
    defaultValue: null,
  },
  latitude: {
    type: Sequelize.DECIMAL(10, 7),
    defaultValue: null,
  },
  longitude: {
    type: Sequelize.DECIMAL(10, 7),    
    defaultValue: null,
  },
  status: {
    type: Sequelize.STRING(45),
    allowNull: false,
    defaultValue: 'ACTIVE'
  },
  created_by: {
    type: Sequelize.STRING(45),
    allowNull: false,
  },  
  updated_by: {
    type: Sequelize.STRING(45),
  }
});

// create table if not exist
Location.sync({force: false}).then(function () {
  return;
});



module.exports.Location = Location;




