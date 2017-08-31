var https = require('https');

exports.idToName = function(accessToken, fbID, callback) {
     /*Please note, NOT all fields requested can be extracted, since different users 
        have different privacy settings. 
        * Only First and Last name are guranteed everytime.
     */ 
    var header = {
        host: 'graph.facebook.com',
        port: 443,
        path: '/' + fbID + '?' + '&access_token=' + accessToken, //apiPath example: '/me/friends'
        method: 'GET'
    };

    var buffer = ''; //this buffer will be populated with the chunks of the data received from facebook
    var request = https.get(header, function(result){
        result.setEncoding('utf8');
        result.on('data', function(chunk){
            buffer += chunk;
        });

        result.on('end', function(){
            callback(buffer);
        });
    });

    request.on('error', function(e){
        console.log('Error in getting User name : ' + e.message)
    });

    request.end();
}