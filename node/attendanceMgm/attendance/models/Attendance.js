var Sequelize = require('../../common/MySQLConnection').Sequelize;
var sequelizeConn = require('../../common/MySQLConnection').sequelizeConn;

var Attendance = sequelizeConn.define('attendance', {
  attendance_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  parking_slot: {
    type: Sequelize.INTEGER,
    defaultValue: null,
  },
  bin_c: {
    type: Sequelize.INTEGER,    
    defaultValue: null,
  },
  user_id: {
    type: Sequelize.STRING(45),
    allowNull: false
  },
  event:{
	  type: Sequelize.STRING(45)
  }  ,
  fence:{
	  type: Sequelize.STRING(45)
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
Attendance.sync({force: false}).then(function () {
  return;
});



module.exports.Attendance = Attendance;




