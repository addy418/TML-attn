var Sequelize = require('../../common/MySQLConnection').Sequelize;
var sequelizeConn = require('../../common/MySQLConnection').sequelizeConn;
var Alert = require('../../alerts/models/Alert').Alert;

var User = sequelizeConn.define('users', {
  full_name: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
  using_car: {
    type: Sequelize.BOOLEAN,    
    defaultValue: false,
  },
  user_id: {
    type: Sequelize.STRING(45),
    allowNull: false,
	primaryKey: true,
  },
  primary_phone_no: {
    type: Sequelize.INTEGER(11),    
    defaultValue: null,
  },
  status: {
    type: Sequelize.STRING(20),
    allowNull: false,
    defaultValue: 'ACTIVE'
  }, 
  mwm_token:{
	type: Sequelize.STRING(300),    
    defaultValue: null
}  ,
  login_status:{
	type:Sequelize.STRING(1),    
	defaultValue:'N'
}, 
   alert_location: {
    type: Sequelize.STRING(45),
	defaultValue: null
  }, 
   alert_status: {
    type: Sequelize.STRING(45),
	defaultValue: "SAFE"
  }, 
  alert_text: {
    type: Sequelize.STRING(45),
	defaultValue: null
  },   
  created_by: {
    type: Sequelize.STRING(45),
    allowNull: false,
  },  
  updated_by: {
    type: Sequelize.STRING(45)
  }
});

User.belongsTo(Alert, {foreignKey: 'alert_id'}); 

// create table if not exist
User.sync({force: false}).then(function () {
  return;
});


module.exports.User = User;




