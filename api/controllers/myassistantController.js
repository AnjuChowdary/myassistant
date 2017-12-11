'use strict';

exports.createEmployee = function(req, res){
  Task.find({}, function(err, task) {
    response = "This is a sample response from your webhook!"
    res.send(JSON.stringify({ "speech": response, "displayText": response
  //"speech" is the spoken version of the response, "displayText" is the visual version
  }));
  });
};
