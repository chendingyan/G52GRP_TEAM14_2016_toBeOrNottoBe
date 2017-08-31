var http = require("https");

var options = {
  "method": "POST",
  "hostname": "dev24930.service-now.com",
  "port": null,
  "path": "/api/now/table/incident",
  "headers": {
    "cookie": "JSESSIONID=3A00BCD3D213A74C95902365F0FE9455; glide_user_route=glide.f6d055dbbc45b347203eab4d638e0994; BIGipServerpool_dev24930=528581642.34880.0000; glide_session_store=291332B9DB4D320029347FCFBF96195E; glide_user=\"U0N2Mjo2aEVjanowQm80TEgwYW5UcVg3MkZyTVBNMU9hcFNPLw==\"; glide_user_session=\"U0N2Mjo2aEVjanowQm80TEgwYW5UcVg3MkZyTVBNMU9hcFNPLw==\"",
    "accept": "application/json",
    "content-type": "application/json",
    "authorization": "Basic YWRtaW46VW9OVGVhbTE0IQ==",
    "content-length": "144"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.write(JSON.stringify({ short_description: '',
  category: 'Software',
  comments: 'Users assessment has not appeared in expected worklist. User verified assessment has not been routed for a management check or assigned to wrong worklist.' }));
req.end();