
var mysql = require('mysql2'),
    url = require('url'),
    SocksConnection = require('socksjs');
//Remote Connection and Proxy variables --Ben
var remote_options = {
    host: '31.170.164.42',
	port: 3306
};

var proxy = url.parse(process.env.QUOTAGUARDSTATIC_URL),
    auth = proxy.auth,
    username = auth.split(':')[0],
    pass = auth.split(':')[1];

var sock_options = {
    host: proxy.hostname,
    port: 1080,
    user: username,
    pass: pass
};

var sockConn = new SocksConnection(remote_options, sock_options);

var connection = mysql.createPool({
  user:'u643631336_atos',
  password:'YDyVyipAec7u',
  database:'u643631336_g52',
  stream: sockConn
});
//--Ben



module.exports = {
        searchById: function(problemId, callback) {
			sockConn = new SocksConnection(remote_options, sock_options);
			connection = mysql.createPool({
			  user:'u643631336_atos',
			  password:'YDyVyipAec7u',
			  database:'u643631336_g52',
			  stream: sockConn
			});
			var selectSql = "SELECT SOLUTION FROM ProblemFix WHERE ProblemId = " + problemId;
            connection.getConnection(function(err, conn) {
            	if(err) throw err;
				conn.query(selectSql, function (err, result) {
					if(err){
						throw new Error("There is something wrong with searchById");
						stop();
						return null;
					}
				
					conn.release();
	                sockConn.dispose();
					callback(JSON.stringify(result[0].SOLUTION).replace(/\"/g, ""));  //Passes the solution as a string to callback without double quotes
				});
	         });
            
        },
        //Yousef
        //Search for a user using the Unique Facebook ID
        searchUserByFBId: function(fbID, callback) {
            var search = "SELECT * from User where SNID = " + fbID;
            // Temp. placed to Manually insert users... until teammates finish intents -Yousef 
            // var name = "Bob Alex";var email = "bobEmail@here.com";var contactnum = "00000000";var snid = fbID;var staffnum = 777;var oss = 3;var region = "UK"; var platform = "Java";
            // var insertSql = "insert into User (ID, NAME, EMAIL, CONTACTNUM, SNID, STAFFNUM, PLATFORMNAME, OS, REGION) values (997,'" + name + "','" + email + "','" + contactnum + "'," + fbID + ",'" + staffnum + "','"+ platform + "','" + oss + "','" + region + "');";
			sockConn = new SocksConnection(remote_options, sock_options);
			connection = mysql.createPool({
			  user:'u643631336_atos',
			  password:'YDyVyipAec7u',
			  database:'u643631336_g52',
			  stream: sockConn
			});

            connection.getConnection(function(err, conn) {
            	if(err) throw err;
	            conn.query(search, function (err, result) {
	                if(err) {
	                	conn.release();
	                    console.error(err); 
	                    return;
	                }
	                // console.log("result:" + result);
	                callback(result);
	                conn.release();
	                sockConn.dispose();
	            });
	         });
        },
		
		insertTicketNum: function(ticketnum, userID){
            var updateticketnum = "UPDATE User SET User.TICKETNUM = '"+ ticketnum +"' WHERE User.SNID = "+ userID;
			console.log("TicketNum: " + ticketnum + "  USerID" + userID);
			sockConn = new SocksConnection(remote_options, sock_options);
			connection = mysql.createPool({
			  user:'u643631336_atos',
			  password:'YDyVyipAec7u',
			  database:'u643631336_g52',
			  stream: sockConn
			});

            connection.getConnection(function(err, conn) {
            	if(err) throw err;
	            conn.query(updateticketnum, function (err, result) {
	                if(err) {
	                	conn.release();
	                    console.error(err); 
	                    return;
	                }
	                // console.log("result:" + result);
	             //   callback(result);
	                conn.release();
	                sockConn.dispose();
	            });
	         });
        },


        getTicketNum: function(userID, callback){
            var updateticketnum = "Select User.TICKETNUM From User WHERE User.SNID = "+ userID;
            sockConn = new SocksConnection(remote_options, sock_options);
            connection = mysql.createPool({
              user:'u643631336_atos',
              password:'YDyVyipAec7u',
              database:'u643631336_g52',
              stream: sockConn
            });

            connection.getConnection(function(err, conn) {
                if(err) throw err;
                conn.query(updateticketnum, function (err, result) {
                    if(err) {
                        conn.release();
                        console.error(err); 
                        return;
                    }
                    console.log("TicketHash: ", result[0].TICKETNUM);
                    callback(result[0].TICKETNUM);
                    conn.release();
                    sockConn.dispose();
                });
             });
        },

        searchByDescription: function(description) {
            var selectSql = "select solution from ProblemFix where Description = " + description;
            connection.query(selectSql, function (err, result) {
                if(err) throw err;
                console.log(result[0].solution);
                return result[0].solution;
            })
        },

        insertUser: function(name, email, contactnum, snid, staffnum, os, region) {
            /* Yousef: Removed the ID column, because it's set to "AUTO_Increment". so DB will handle it */
            var insertSql = "insert into User (NAME, EMAIL, CONTACTNUM, SNID, STAFFNUM, OS, REGION) values ('" + name + "','" + email + "','" + contactnum + "'," + snid + ",'" + staffnum + "','" + os + "','" + region + "');";
            sockConn = new SocksConnection(remote_options, sock_options);
			connection = mysql.createPool({
			  user:'u643631336_atos',
			  password:'YDyVyipAec7u',
			  database:'u643631336_g52',
			  stream: sockConn
			});

            connection.getConnection(function(err, conn) {
            	if(err) throw err;
	            conn.query(insertSql, function (err, result) {
	                if(err) {
                        //console.log("Error insertUser:" + result);
                        conn.release();
                        console.error(err); 
                        return;
                    }
                    console.log("User is registered");
	                // callback(result);
	                conn.release();
	                sockConn.dispose();
	            });
	         });
        },

        insertProblem: function(problemId, description, solution, userId, issolved) {
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth()+ 1;
            var day = date.getDate();
            var time = year+ "-" + month+ "-" + day;
            // console.log(time);
            var insertSql = "insert into ProblemFix values (" + problemId + ", '" + description + "','" + solution + "'," + userId + ",'" + time+ "', " + issolved+ ");";
            connection.query(insertSql, function (err, result) {
                if(err) throw err;
                console.log(result);
            });
        },
		

        insertSolution: function() {
            
        },

        deleteUserById: function(id) {
            var deleteSql = "Delete from User where id = " + id;
            connection.query(deleteSql, function (err, result) {
                if(err) throw err;
                console.log(result);
            })
        },

        deleteUserByName: function(name) {
            var deleteSql = "Delete from User where name = '" + name+ "';";
            connection.query(deleteSql, function (err, result) {
                if(err) throw err;
                console.log(result);
            })
        },

        deleteProblemById: function(problemId){
            var deleteSql = "Delete from ProblemFix where ProblemId = " + problemId;
            connection.query(deleteSql, function (err, result) {
                if(err) throw err;
                console.log(result);
            })
        },
        stop: function() {
            connection.end();
        },
};

function stop() {
    connection.end();
}