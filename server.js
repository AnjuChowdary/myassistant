var express = require('express'),
  app = express(),
  port = process.env.PORT || 3001;
  Task = require('./api/models/myassistantModel'),
  bodyParser = require('body-parser');


  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());


  var routes = require('./api/routes/myassistantRoute'); //importing route
  routes(app); //register the route

app.listen(port);

console.log('Vsoft Agent RESTful API server started on: ' + port);
