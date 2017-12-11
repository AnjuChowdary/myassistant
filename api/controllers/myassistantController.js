'use strict';
var users = [];
exports.createEmployee = function(req, res){
    // response = "This is a sample response from your webhook!";
    users.push(req.body.result.parameters['employeename']);
    if(users.length>0){
      // String us = users[0];
    //   var usersLength = users.length;
      res.send(JSON.stringify({ "speech": "User " + users[0] + " has been added successfully",
                                "displayText": "User "+ users[0] + " has been added successfully"
    //"speech" is the spoken version of the response, "displayText" is the visual version
    }));
    // const app = new ActionsSdkApp({req, res});
    function basicCard () {
      const app = require('actions-on-google').myassistant;
      app.ask(app.buildRichResponse()
        // Create a basic card and add it to the rich response
        .addSimpleResponse('New Employee Registration')
        .addBasicCard(app.buildBasicCard('Employee Created Successfully.')
          .setTitle('New Employee')
          .addButton('Read more', 'https://example.google.com/mathandprimes')
          .setImage('https://example.google.com/42.png', 'Image alternate text')
          .setImageDisplay('CROPPED')
        )
      );
  }

    }else{
      res.send(JSON.stringify({ "speech": "This is a sample response from your webhook!",
                                "displayText": "This is a sample response from your webhook!"
    //"speech" is the spoken version of the response, "displayText" is the visual version
    }));
    }
};
