'use strict';
const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
// let transporter;
var transportee = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'G52GRPteam14@gmail.com',
        pass: 'uonproject'
    }
});


module.exports = {
    welcomeemail : function (email) {

        //send welcome message to the user
        // setup email data with unicode symbols
        var mailOptions = {
            from: '"Team14" <G52GRPteam14@gmail.com>', // sender address
            to: email, // list of receivers
            subject: 'Hello ✔', // Subject line
            text: 'Welcome to register the UON_Team 14 intelligent facebook bot!', // plain text body
            html: '<b>Welcome to register the UON_Team 14 intelligent facebook bot!</b>' // html body
        };
        transporter.sendMail(mailOptions, function(error, info)  {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });
    },

    ticketemail : function (email, ticketnum) {

        var mailOptions = {
            from: '"Team14" <G52GRPteam14@gmail.com>', // sender address
            to: email, // list of receivers
            subject: 'Your Ticket Number', // Subject line
            text: 'We have known that you got an unsolved problem. The problem is already sent to ServiceNow and your ticketnumber is ' + ticketnum + '.', // plain text body
            html: '<b>We have known that you got an unsolved problem. The problem is already sent to ServiceNow and your ticketnumber is </b>' // html body
        };
        transporter.sendMail(mailOptions, function(error, info)  {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });
    }

};