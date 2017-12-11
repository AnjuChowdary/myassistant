'use strict';
var users = [];
exports.createEmployee = function(req, res){
    // response = "This is a sample response from your webhook!";
    users.push(req.body.result.parameters['employeename']);
    if(users.length>0){
      // String us = users[0];
    //   var usersLength = users.length;
    //   res.send(JSON.stringify({ "speech": "User " + users[0] + " has been added successfully",
    //                             "displayText": "User "+ users[0] + " has been added successfully"
    // //"speech" is the spoken version of the response, "displayText" is the visual version
    // }));
    // const app = new ActionsSdkApp({req, res});
    app.ask(app.buildRichResponse()
      // Create a basic card and add it to the rich response
      .addSimpleResponse('Math and prime numbers it is!')
      .addBasicCard(app.buildBasicCard('42 is an even composite number. It' +
        'is composed of three distinct prime numbers multiplied together. It' +
        'has a total of eight divisors. 42 is an abundant number, because the' +
        'sum of its proper divisors 54 is greater than itself. To count from' +
        '1 to 42 would take you about twenty-one…')
        .setTitle('Math & prime numbers')
        .addButton('Read more', 'https://example.google.com/mathandprimes')
        .setImage('https://example.google.com/42.png', 'Image alternate text')
        .setImageDisplay('CROPPED')
      )
    );

    }else{
      res.send(JSON.stringify({ "speech": "This is a sample response from your webhook!",
                                "displayText": "This is a sample response from your webhook!"
    //"speech" is the spoken version of the response, "displayText" is the visual version
    }));
    }
};
