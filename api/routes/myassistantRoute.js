'use strict';
module.exports = function(app){
  var empList = require('../controllers/myassistantController');

  //empList Routes
  app.route('/createEmployee')
    .post(empList.createEmployee)
}
