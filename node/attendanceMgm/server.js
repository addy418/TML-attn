'use strict';

var app = require('connect')();
var http = require('http');
var swaggerTools = require('swagger-tools');

var serverPort = 8080;
var bodyParser = require('body-parser'); 
var multer = require('multer'); 
var os = require('os');
var cors = require('cors');
app.use(cors());

// swaggerRouter configuration
var options = {
  controllers: ['./locations/controllers','./attendance/controllers','./sos/controllers','./users/controller','./parkingInfo/controller',
                './alerts/controller','./geofences/controller'],
  useStubs: process.env.NODE_ENV === 'development' ? true : false // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var swaggerDoc = require('./api/swagger.json');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());

  // Start the server
  http.createServer(app).listen(serverPort, function () {
    console.log('Server is listening at http://%s:%d', os.hostname(), serverPort);
  });
});

