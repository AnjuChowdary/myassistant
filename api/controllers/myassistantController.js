'use strict';
var users = [];
exports.createEmployee = function(req, res){
    // response = "This is a sample response from your webhook!";
    users.push(req.body.result.parameters['employeename']);
    // const app = require('actions-on-google').my-assistant-783d0;

    const { DialogflowApp } = require('actions-on-google');
    const app = new DialogflowApp({request: req, response: res});

    console.log(req.body.result['action']);
    console.log(req.body.result['action'] == "intent.createEmployee");

    // console.log(app);
    console.log("users[] length: "+users.length);
    for(var i = 0;i<users.length;i++){
      console.log("User "+i+" "+users[i]);
    }

    if(req.body.result['action'] == "createemployee") {
      const hasScreen = app.hasSurfaceCapability(app.SurfaceCapabilities.SCREEN_OUTPUT);
      console.log("hasScreenOutput"+hasScreen);
      if(hasScreen){

          console.log("basicCard Creation");
          app.ask(app.buildRichResponse()
            // Create a basic card and add it to the rich response
            .addSimpleResponse('Employee '+users[users.length-1]+' registered successfully.')
            .addBasicCard(app.buildBasicCard('VSoft’s development methodologies transform your requirements and objectives into innovative products with features that serve you well now and into the future. Our experienced project management teams strive for on-time delivery of your project, whether it is a single installation at a local institution; or a multi-phase, complex program for a data center or larger global financial institution.')
              .setTitle('Vsofts Employee Registration')
              .addButton('Read more about Vsoft Technologies', 'http://www.vsoftcorp.com/')
              .setImage('https://restcountries.eu/data/ind.svg', 'Image alternate text')
              .setImageDisplay('CROPPED')
            )
          );

        //   let actionMap = new Map();
        //   actionMap.set(app.StandardIntents.TEXT, "createEmployee");
        //   actionMap.set(app.StandardIntents.TEXT, "employeeDetails");
        //
        // app.handleRequest(actionMap);
          console.log("Card Created");

      console.log("Basic card created successfully");
    }else{
      if(users.length>0){

          res.send(JSON.stringify({ "speech": "User " + users[0] + " has been added successfully",
                                    "displayText": "User "+ users[0] + " has been added successfully",
                                    "possibleIntents": [
                                        {
                                            "intent": "employeeDetails"
                                        }
                                      ]
        //"speech" is the spoken version of the response, "displayText" is the visual version
        }));

      }else{
        res.send(JSON.stringify({ "speech": "This is a sample response from your webhook!",
                                  "displayText": "This is a sample response from your webhook!",
                                  "possibleIntents": [
                                      {
                                          "intent": "employeeDetails"
                                      }
                                    ]
      //"speech" is the spoken version of the response, "displayText" is the visual version
      }));
      }
    }
  }else if(req.body.result['action'] == "intent.welcome"){
    function welcomeIntent (app) {
        app.ask('Welcome to Vsoft! Say a name.',
                  ['Say any name', 'Pick a number', 'We can stop here. See you soon.']);
    }

    function createIntent (app) {
      const number = app.getArgument(NUMBER_ARGUMENT);
      app.tell('You said ' + number);
    }

    const actionMap = new Map();
    actionMap.set("intent.welcome", welcomeIntent);
    actionMap.set("intent.createEmployee", createIntent);
    app.handleRequest(actionMap);

  }else{
    console.log("No matching action found");
  }

};
