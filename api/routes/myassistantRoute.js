'use strict';
module.exports = function(app){
  var empList = require('../controllers/myassistantController');

  //empList Routes
  app.route('/employee')
    .post(empList.createEmployee)
}
