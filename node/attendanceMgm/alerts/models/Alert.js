var Sequelize = require('../../common/MySQLConnection').Sequelize;
var sequelizeConn = require('../../common/MySQLConnection').sequelizeConn;

var Alert = sequelizeConn.define('alerts', {
  alert_id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  alerts_text: {
    type: Sequelize.STRING(50),
    defaultValue: null,
  },
  alert_zone: {
    type: Sequelize.STRING(50),
    allowNull: false
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
Alert.sync({
  force: false
}).then(function() {
  return;
});



module.exports.Alert = Alert;
