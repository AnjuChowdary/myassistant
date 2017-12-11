'use strict';
var users = [];
exports.createEmployee = function(req, res){
    // response = "This is a sample response from your webhook!";
    users.push(req.data);
    if(users.length>0){
      String us = users[0];
      var usersLength = users.length;
      res.send(JSON.stringify({ "speech": usersLength + "Users has been added successfully",
                                "displayText": "User "+ us + " has been added successfully"
    //"speech" is the spoken version of the response, "displayText" is the visual version
    }));
    }else{
      res.send(JSON.stringify({ "speech": "This is a sample response from your webhook!",
                                "displayText": "This is a sample response from your webhook!"
    //"speech" is the spoken version of the response, "displayText" is the visual version
    }));
    }
};
