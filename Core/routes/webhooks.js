var express = require('express');
var router = express.Router();
var request = require('request');
var facebook = require('../FBGraphApi/API.js');
var DB = require('../DatabaseConnector/DB.js');
var http = require('http');
var comment; // when generating a ticket to service now, store string in this variable to be passed into generateTicket function

/* GET home page. */

/* This method is triggred first when our webhooks routes is hit 
we call a movie recoomendation function and pass the function request and response parameter */
var userID;
var first_name;
router.post("/", function(req, res, next) {
	var apiSpeech = req.body.result.fulfillment['speech'];
    res.setHeader('Content-Type', 'application/json');
    userID = req.body.originalRequest.data.sender["id"];
    //-Yousef
    var intentName = req.body.result.metadata['intentName'];
        
     if (intentName === "good day") {
            //get the user info using FBGraph API
            checkUserExists(res, apiSpeech);
    } 
    //------------------ End of Identifying user ----------------///
	else if (intentName === "CreateTicket") {  // use === instead of == to verify type and prevent potential bugs -Yousef
		console.log("gotIntent: Calling generateTicket");
		comment = req.body.result.parameters["os"]; //"NodeJS/ServiceNow Testing -Yousef"; //fill this in with cusomter's problem.
		generateTicket(comment, "");
	}
	else if (intentName === "ticketupdate"){
		var u_ticketHash = req.body.result.parameters["ticket"];
        console.log("ticketnumber: " + u_ticketHash);
        	//Getting Ticket Status - EXMAPLE
			getTicket(u_ticketHash, function(status) {
				sendMsg(res, "Your Ticket Status is: " + status + ".\n" + apiSpeech);
			});	

    }else if (intentName === "GetDetails"){
		console.log("\nReceived Details//TODO add to database\n");
		facebook.idToName(ACCESS_TOKEN, userID, function(data){
				var jsonResponse = JSON.parse(data);
				var first_name = jsonResponse['first_name'];
				var last_name = jsonResponse['last_name'];
				var name = first_name + " " + last_name;
				var emailadd = req.body.result.parameters["emailadd"];
				var contactnum = req.body.result.parameters["contactnum"];
				var os = req.body.result.parameters["os"];
				var region = req.body.result.parameters["region"];
				var staffnum = req.body.result.parameters["staffnum"];
				console.log("name: " + name + " emailadd: " + emailadd + " contactnum: " + contactnum + " userID: " + userID + " staffnum: " + staffnum + " os: " + os + " region: " + region);
				DB.insertUser(name, emailadd, contactnum, userID, staffnum, os, region);
		});
		sendMsg(res, apiSpeech);
	}else if(intentName === "InternetDown"){
		//Getting Ticket Status By Facebook ID - EXMAPLE
		DB.getTicketNum(userID, function (ticketHash) {
			getTicket(ticketHash, function(status) {
				sendMsg(res, apiSpeech + status);
			});	
		});


	}else if(intentName == "fallbackproblem"){
		console.log("gotIntent: Calling fallback");
		comment = req.body.originalRequest.data.message["text"];
		console.log(comment);

		generateTicket(comment, "", function (ticketID){
			console.log("Generated a ticket. Your ticket number is: ");
			sendMsg(res, apiSpeech + ticketID);
			DB.insertTicketNum(ticketID, userID);
		});
		
		}else if(intentName == "SolutionFailed"){
			
		proposedSolutionID = req.body.result.parameters["proposedsolution"]; //Passes id from original intent to the failed intent. --Ben
		console.log(proposedSolutionID);
		console.log("gotIntent: solutionFailed");
		var user_problem = req.body.originalRequest.data.message["text"];
		var proposed_solution = "" + proposedSolutionID + ""; //TODO: FILL THIS IN with solution that didn't help
		console.log(comment);

		
		generateTicket(user_problem, proposed_solution, function (ticketID){
			console.log("Generated a ticket. Your ticket number is: ");
			sendMsg(res, apiSpeech + ticketID);
			DB.insertTicketNum(ticketID, userID);
		});
		
	}else if(!isNaN(intentName)){
		DB.searchById(intentName, function(solution){			//This gets the solution for the intent and sends it back to the user.
			console.log(solution);
			sendMsg(res, solution);
		});
		
	}
		
    return;
});

//-Yousef
var ACCESS_TOKEN = 'EAAOeZCDTZCOVQBACZAwjku81PsFyvGIch5d47rgBIMEsccUg9YI51nlh3LvvltTdFX3foh7jGUZAdWLf3InXQnJh6ep0lRZCPuGs0Oa3Y4D0ah1m5iu2AEVh7JnX2uuWxlARiN848DD7JfLwawsRlo3l7cvc6fqapxNibCVZC5nAZDZD';
function checkUserExists(res, apiSpeech) {
	var databaseResult;
    var msg;
	DB.searchUserByFBId(userID, function(userInfo, err) {
		var stringUserInfo = JSON.stringify(userInfo);
		if(stringUserInfo == '[]') {
			console.log("User not registered, ASK for more info");
			facebook.idToName(ACCESS_TOKEN, userID, function(data){
				var jsonResponse = JSON.parse(data);
				first_name = jsonResponse['first_name'];
				var last_name = jsonResponse['last_name'];
				console.log(data);
				//databaseResult = 'Can I have the following information please:\n1- Email Address\n2-Contact Number\n3-Staff Number\n4-OS\n5-Region';
                //msg = apiSpeech + " " + first_name + '\n' + databaseResult;
                //sendMsg(res, msg);
				var askdet = "I'm going to ask for your details."
				var eventtrigger = {
					"speech": askdet,
					"displayText": askdet,
					"followupEvent":{
						"name":"getInfo"
					
					}
					
				}
				res.send(eventtrigger);
			});
		} 
		else  {
            first_name = userInfo[0].NAME;
	    	console.log('Found user in Database\nName: ' + first_name);
			console.log("userInfo: " + stringUserInfo );
			var filledData = 'Email Address: ' +userInfo[0].EMAIL + '\nContact Number:' + userInfo[0].CONTACTNUM + '\nStaff Number:' + userInfo[0].STAFFNUM +'\nOS:' + userInfo[0].OS + '\nPlatform:' + userInfo[0].PLATFORMNAME + '\nRegion:' + userInfo[0].REGION;
			databaseResult = 'Welcome back!\nAre these up-to-date?\n' + filledData;
            msg = apiSpeech + " " + first_name + '!\nWelcome back, how can I assist you today?';
			// ATTENTION - I have disabled the part of the message which asks if details are up to date
			//- only uncomment if you know what you are doing
			//msg = apiSpeech + " " + first_name + '\n' + databaseResult;
            sendMsg(res, msg);
	    	// DB.stop();
		}
    });
            return;
}

function sendMsg(res, msg) {
    var reply = msg;
            var response = {
                speech: reply,
                displayText: reply,
             };
    res.send(response); //sending back the response
}

//-Ben, Yousef #TESTING
function generateTicket(comment, proposed_solution ,callback) {
	console.log	('Creating a ticket');

    var suggested = "None";
    if ( !(proposed_solution === "") ) {
    	suggested = "The suggested solution was:" + proposed_solution;
    }
request({
    'url': 'https://dev32101.service-now.com/api/now/table/incident', //URL to hit
    'method': 'POST',
    'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    'auth': {
      'user': 'admin', //org ID
      'pass': 'UoNTeam14!', //API key
      'sendImmediately': false
    },

    //Lets post the following key/values as form
    'json': {
      "short_description": comment,
      "comments": suggested,
        "category": "software"
    }
}, function(error, response, body){
    if(error) {
        console.log(error);
    } else {
        console.log("response:" + JSON.stringify(response) + "\nBody: " + JSON.stringify(body));
        var ticketID = body.result["sys_id"];
        //console.log("Raised Ticket Number: " + ticketID);
		//console.log("Generated a ticket. Your ticket number is: ");
		//sendMsg(res, "Generated a ticket. Your ticket number is: " + ticketID);
		callback(ticketID);
		//return ticketID;
    }
    // res.status(200).send("this is a test");
});
	}


//Getting Ticket From ServiceNow, Hash is stored in user DB -Yousef
function getTicket(ticketHash, callback) {
	var ticketState = ["NULL", "New", "In Progress", "On Hold","Resolved","Closed","Cancelled"]; //Resolved and Canelled needs fixing?
	console.log	('Getting a ticket: ' + ticketHash);
	request({
	    'url': 'https://dev32101.service-now.com/api/now/table/incident/' + ticketHash, //URL to hit
	    'method': 'GET',
	    'headers': {
	        'Content-Type': 'application/json',
	        'Accept': 'application/json'
	    },
	    'auth': {
	      'user': 'admin', //org ID
	      'pass': 'UoNTeam14!', //API key
	      'sendImmediately': false
	    },

	}, function(error, response, body){
	    if(error) {
	        console.log(error);
	    } else {
	        // console.log('-body-:', body);
	        var json = JSON.parse(body);
	        var ticketStatusNum = json["result"].state;
	        var ticketStatus = ticketState[ticketStatusNum];
			callback(ticketStatus);	
	    }
	});
}


module.exports = router;