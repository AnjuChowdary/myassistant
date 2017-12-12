'use strict';
var users = [];
exports.createEmployee = function(req, res){
    // response = "This is a sample response from your webhook!";
    users.push(req.body.result.parameters['employeename']);
    // const app = require('actions-on-google').my-assistant-783d0;

    const { DialogflowApp } = require('actions-on-google');
    const app = new DialogflowApp({request: req, response: res});

    // console.log(app);
    console.log("Users[0]: "+users[0]);
    const hasScreen = app.hasSurfaceCapability(app.SurfaceCapabilities.SCREEN_OUTPUT);
    console.log("hasScreenOutput"+hasScreen);
    if(hasScreen){
      // function basicCard () {
        console.log("basicCard Creation");
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
        console.log("Card Created");
    // }
    console.log("Basic card created successfully");
  }else{
    if(users.length>0){

        res.send(JSON.stringify({ "speech": "User " + users[0] + " has been added successfully",
                                  "displayText": "User "+ users[0] + " has been added successfully"
      //"speech" is the spoken version of the response, "displayText" is the visual version
      }));

    }else{
      res.send(JSON.stringify({ "speech": "This is a sample response from your webhook!",
                                "displayText": "This is a sample response from your webhook!"
    //"speech" is the spoken version of the response, "displayText" is the visual version
    }));
    }
  }

};
