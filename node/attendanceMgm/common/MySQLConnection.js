var Sequelize = require('sequelize');
var sequelizeConn = new Sequelize('tml_db1', 'root', 'root', {
  dialect: "mysql",
  port:    3306,
  logging: false
});

sequelizeConn.authenticate()
.then(function() {
    console.log('MySQL connection opened.');
}, function (err) { 
    console.log('Unable to connect to the MySQL:', err);
});

module.exports.Sequelize = Sequelize;
module.exports.sequelizeConn = sequelizeConn;