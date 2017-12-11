'use strict';

exports.createEmployee = function(req, res){
    // response = "This is a sample response from your webhook!";
    res.send(JSON.stringify({ "speech": "This is a sample response from your webhook!",
                              "displayText": "This is a sample response from your webhook!"
  //"speech" is the spoken version of the response, "displayText" is the visual version
  }));
};
