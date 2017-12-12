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


    if(req.body.result['action'] == "intent.createEmployee") {

      users.push();
      console.log("users[] length: "+users.length);
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

          function createIntent (app) {
            console.log("createIntent invoked.");
            // const name = app.getArgument("intent.createEmployee");
            app.ask("You want to know the details of the created employee?");
          }

          function detailsIntent (app) {
            console.log("detailsIntent invoked.");
              app.ask('Sorry!! Details are not available.');
          }

          const actionMap = new Map();
          actionMap.set("intent.createEmployee", createIntent);
          app.handleRequest(actionMap);

          const actionMap1 = new Map();
          actionMap.set("intent.details", detailsIntent);
          app.handleRequest(actionMap1);
      }else{
          if(users.length>0){

              res.send(JSON.stringify({ "speech": "User " + users[0] + " has been added successfully",
                                        "displayText": "User "+ users[0] + " has been added successfully"
            }));

          }else{
            res.send(JSON.stringify({ "speech": "This is a sample response from your webhook!",
                                      "displayText": "This is a sample response from your webhook!"
          }));
          }
      }
    }else if(req.body.result['action'] == "intent.welcome"){
      welcome();
    }else if(req.body.result['action'] == "intent.details"){
      detailsEmp(req.body.result.parameters['employeename']);
    }else if(req.body.result['action'] == "intent.branches"){
      res.send(JSON.stringify({ "speech": "The branches of vsoft are Madhapur main branch and Kukatpally branch",
                                "displayText": "The branches of vsoft are Madhapur main branch and Kukatpally branch"
    }));
      // branches();
    }

  // function branches(){
  //   console.log("branches invoked.");
  //   function branchIntent (app) {
  //     console.log("Welcome Intent invoked.");
  //       app.ask('The branches of vsoft are Madhapur main branch and Kukatpally branch');
  //   }
  //
  //   const actionMap = new Map();
  //   actionMap.set("intent.details", branchIntent);
  //   app.handleRequest(actionMap);
  // }

  function detailsEmp(name){
    console.log("detailsEmp invoked.");
    function detailsIntent (app) {
      console.log("detailsIntent invoked.");
        if(name == "anju"){
          app.ask('Employee id of Anju is 1897.');
        }else if(name == "Chaitanya"){
          app.ask('Employee id of Chaitanya is 1898.');
        }
    }
    const actionMap = new Map();
    actionMap.set("intent.details", detailsIntent);
    app.handleRequest(actionMap);
  }

  function createEmp(name){
    console.log("createEmp invoked.");

  }

  function welcome(){
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
