'use strict';
var users = [];
exports.createEmployee = function(req, res){

    // response = "This is a sample response from your webhook!";
    const { DialogflowApp } = require('actions-on-google');
    const app = new DialogflowApp({request: req, response: res});
    const hasScreen = app.hasSurfaceCapability(app.SurfaceCapabilities.SCREEN_OUTPUT);
    console.log("hasScreenOutput: "+hasScreen);
    console.log(req.body.result['action']);
    // console.log(app);

    console.log("Request body: "+JSON.stringify(req.body));

    if(req.body.result['action'] == "intent.createEmployee") {

      users.push(req.body.result.parameters['employeename']);
      console.log("users[] length: "+users.length);
      console.log("Session Id: "+req.body.sessionId);
      console.log("Context length: "+req.body.result.contexts.length);
      if(req.body.result.contexts.length>0){
        console.log("Context: "+req.body.result.contexts[0].name);
        console.log("Context parameters: "+req.body.result.contexts[0].parameters['employeename']);
      }
      for(var i = 0;i<users.length;i++){
        console.log("User "+i+" "+users[i]);
      }

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
          console.log("Card Created");
          console.log("Basic card created successfully");


          console.log("Vsoft Assistant Response");
          console.log(res);
      }else{
          if(users.length>0){

              res.send(JSON.stringify({ "speech": "User " + users[users.length-1] + " has been added successfully",
                                        "displayText": "User "+ users[users.length-1] + " has been added successfully",
                                        "contextOut":[
                                          {
                                            "name":"userId",
                                            "parameters":{
                                              "ofuser":"123456"
                                            },
                                            "lifespan":10,
                                          }
                                        ],
                                        "followupEvent":{
                                          "name":"welcome_event",
                                          "data":{
                                            "user":users[0],
                                            "surname":"Palacharla"
                                          }
                                        }
            }));


          }else{
            res.send(JSON.stringify({ "speech": "This is a sample response from your webhook!",
                                      "displayText": "This is a sample response from your webhook!"
          }));
          }

          console.log("Vsoft Assistant Response");
          console.log(res);
      }
    }else if(req.body.result['action'] == "intent.welcome"){
      welcome(req);
    }else if(req.body.result['action'] == "intent.details"){
      detailsEmp(req.body.result.parameters['employeename']);
    }else if(req.body.result['action'] == "intent.branches"){
      res.send(JSON.stringify({ "speech": "The branches of vsoft are Madhapur main branch and Kukatpally branch",
                                "displayText": "The branches of vsoft are Madhapur main branch and Kukatpally branch"
    }));
      // branches();
    }else if(req.body.result['action'] == "intent.deleteEmployee"){
      var indexOfAnju = 0;
      for(var i = 0;i<=users.length;i++){
        if(users[i] == "Sri Anju" || users[i] == "Anju"){
          console.log("users array has anju element");
          indexOfAnju = i;
          users.splice(indexOfAnju,1);

          res.send(JSON.stringify({ "speech": "Employee Anju deleted Successfully",
                                    "displayText": "Employee Anju deleted Successfully"
        }));
      }else{
        res.send(JSON.stringify({ "speech": "No Employee found to delete",
                                  "displayText": "No employee found to delete"
      }));
      }
      }
    }else if(req.body.result['action'] == "intent.welcomeEmployee"){
      console.log("welcome employee intent invoked.");
      console.log(req.body.result.contexts[0].name);
      res.send(JSON.stringify({ "speech": "Welocme! Anju",
                                "displayText": "Welcome! Anju"
                              }));
    }

  function detailsEmp(name){
    console.log("detailsEmp invoked.");
    function detailsIntent (app) {
      console.log("detailsIntent invoked.");
      console.log("name value: "+name);
        if(name == "anju" || name == "Sri Anju"){
          app.ask('Employee id of Anju is 1897.');
        }else if(name == "Chaitanya" || name == "Chaitanya Krishna"){
          app.ask('Employee id of Chaitanya is 1898.');
        }else{
          app.ask('Not found.');
        }
    }
    const actionMap = new Map();
    actionMap.set("intent.details", detailsIntent);
    app.handleRequest(actionMap);
  }

  function createEmp(name){
    console.log("createEmp invoked.");

  }

  function welcome(req){
    console.log("welcome invoked.");
    function welcomeIntent (app) {
      console.log("Welcome Intent invoked.");
        app.ask('Welcome to Vsoft! How may I help you?.');
    }

    const actionMap = new Map();
    actionMap.set("intent.welcome", welcomeIntent);
    app.handleRequest(actionMap);

  }

};
