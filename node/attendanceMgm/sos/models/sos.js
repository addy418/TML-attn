var Sequelize = require('../../common/MySQLConnection').Sequelize;
var sequelizeConn = require('../../common/MySQLConnection').sequelizeConn;

var SOS = sequelizeConn.define('sos', {
  sos_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  sos_timestamp: {
    type: Sequelize.DATE,
    defaultValue: null
  },
  sos_by: {
    type: Sequelize.STRING(45),
    defaultValue: null,
  },
  sos_text: {
    type: Sequelize.STRING(45),
    allowNull: false,
  },
  respondant_user_id: {
    type: Sequelize.STRING(45)
  },
  respondant_text: {
    type: Sequelize.STRING
  },
  respondant_name: {
    type: Sequelize.STRING(100)
  }, 
  status: {
    type: Sequelize.STRING(45),
	allowNull: false,
	defaultValue: 'OPEN',
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
SOS.sync({force: false}).then(function () {
  return;
});



module.exports.SOS = SOS;




