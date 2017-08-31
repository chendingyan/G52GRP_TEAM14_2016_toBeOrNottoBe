//required plugins
var login = require("facebook-chat-api");
var moment = require('moment');
var fs = require("fs");
var request = require('request');


login({email: "YOUR EMAIL HERE", password: "YOUR PASSWORD HERE"}, function callback (err, api) {
    if(err) return console.error(err);
	  api.setOptions({listenEvents: true});
    api.setOptions({selfListen : false});
    var stopListening = api.listen(function(err,event){
          if(err) return console.error(err);
          var myName = new RegExp("/bob|@bob|/bot|@bot"); //myName, these are the you can call the bot by, so he can start listening
          if(event.body != null && myName.test(event.body))
          {
                event.body.substring(5);
                console.log(event.body);
              	api.getUserInfo(event.senderID, function(err, ret) {
            				  if(err) return console.error(err);
            					console.log(ret[event.senderID]);
            					talkingTo = ret[event.senderID].name;
          				 });
                  console.log("message recieved: " + event.body + " ID: " + event.senderID); //logs the message recieved
                  var body = event.body.toLowerCase();
                  //currently supported phrases/questions (bot knowledge)
                  var howareyou = new RegExp("how are you|alright?|how you doin|whats up|sup");
                  var hello = new RegExp("hello|hi|Hola|eeey");
                  var bye = new RegExp("bye|bbye|byeee|see you around");
                  var memes = new RegExp("dank memes|show me memes|memes|meme");
                  var gender = new RegExp("what's your gender|what gender are you|what are you|your gender|gender are you")
                  var wherefrom = new RegExp("where are you from|you from|where you from|where u from|u from")
                  var favfood = new RegExp("favourite food|favorite food|fav food|you eat")
                  var team14 = new RegExp("opinion on team 14|team 14|team14")
                  var whoami = new RegExp("do you know me|who am i|know me|whoami")
                  var gend = ["unknown","Female","Male"]

                  /* Note:
                  * in the mean time, the bot uses string matching to identify words and respond.
                  */

                  if(event.body == '/stopX') {
                      api.logout();
                      return;
                  }
                  else if (hello.test(body)) { //if the sender is saying hello...
                      var msg;
                      api.getUserInfo(event.senderID, function(err, ret) {
                    			if(err) return console.error(err);
                    			msg = "Hello " + ret[event.senderID].firstName + "!";
                    			api.sendMessage(msg, event.threadID);
                  		});
                  }
                  else if (whoami.test(body)) {
                      api.getUserInfo(event.senderID, function(err, ret) {
                    			if(err) return console.error(err);
                    			var msg = {
                              body: "You're: " + ret[event.senderID].name + "\nGender: "+ gend[ret[event.senderID].gender]+ "\nIs your birthday today: " + ret[event.senderID].isBirthday
                                  + "\nAre you my friend on FB: " +ret[event.senderID].isFriend
                            }

                    			api.sendMessage(msg, event.threadID);
                  		});
                  }
                  else if (howareyou.test(body) ) {
                    	console.log("Asking about me");
                    	var msg = {
          				      body: "I am gr8 m8👌\nYou?",
    				          }
          				    api.sendMessage(msg, event.threadID);
                  }
                  else if (wherefrom.test(body) ) {
                    	console.log("Asking about me from");
                    	var msg = {
          				      body: "Hmmm... Facebook I guess",
    				          }
          				    api.sendMessage(msg, event.threadID);
                  }
                  else if (favfood.test(body) ) {
                    	console.log("Asking about me food");
                    	var msg = {
          				      body: "PIZZA M8... PIZZA FTW!🍕",
    				          }
          				    api.sendMessage(msg, event.threadID);
                      var msg = "🍕🍕🍕";
          				    api.sendMessage(msg, event.threadID);
                  }
                  else if (team14.test(body) ) {
                    	console.log("Asking about me team14");
                    	var msg = {
          				      body: "THE. BEST. End of speech!👌\nNew line",
    				          }
          				    api.sendMessage(msg, event.threadID);
                  }
                  else if (gender.test(body) ) {
                    	console.log("Asking about me gender");
                    	var msg = {
          				      body: "Mmmm... a bot maybe?\nisn't it clear😅",
    				          }
          				    api.sendMessage(msg, event.threadID);
                  }
                  else if (bye.test(body) ) {
                    	console.log("Bye");
                      var msg;
                      api.getUserInfo(event.senderID, function(err, ret) {
                    			if(err) return console.error(err);
                    			msg = "Alright! See you around " + ret[event.senderID].firstName + "!";
                    			api.sendMessage(msg, event.threadID);
                  		});
                  }
                  else if (memes.test(body) ) {
                    	console.log("memes");
                      var num = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
                    	var msg = {
          				      body: "So you want Memes mate?\n Meme😎 #" + num,
          				      attachment: fs.createReadStream("dmemes/" + num + ".jpg")
    				          }
          				    api.sendMessage(msg, event.threadID);
          				    var msg = "😂😂";
          				    api.sendMessage(msg, event.threadID);
                  }

                  else if (event.body != null ) {
                    	console.log("trollin...");
                    	var msg = {
          				      body: "I didn't learn this yet!!\nthey see me trollin.. they hattin...",
          				      attachment: fs.createReadStream("image.jpg")
    				          }
          				    api.sendMessage(msg, event.threadID);
          				    var msg = "😂😂";
          				    api.sendMessage(msg, event.threadID);
                  }
          }
    });
});
