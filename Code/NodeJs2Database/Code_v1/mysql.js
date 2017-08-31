var mysql = require('mysql');
var username = 'root'; /* CHANGE AS NEEDED */
var password = 'root'; /* CHANGE AS NEEDED */
var database_name = 'GRP';
var connection = mysql.createConnection({
    host : 'localhost',
    user : username,
    password : password,
    database : database_name,
    port : 3306,
});

module.exports = {
        searchById: function(problemId) {
            var selectSql = "select solution from ProblemFix where ProblemId = " + problemId;
            connection.query(selectSql, function (err, result) {
                if(err){
                    throw new Error("There is something wrong with searchById");
                    stop();
                    return null;
                }
                console.log(result[0].solution);
                stop();
                return result[0].solution;
            });
        },
        //Yousef
        //Search for a user using the Unique Facebook ID
        searchUserByFBId: function(fbID, callback) {
            var search = "SELECT * from User where SNID = " + fbID;
            connection.query(search, function (err, result) {
                if(err) {
                    throw err;
                    // return err;
                }
                // console.log("result:" + result);
                callback(result);
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
            connection.query(insertSql, function (err, result) {
                if(err) {
                     throw err;
                     console.log("insertUser Error");
                }
                // console.log(result);
                console.log("Registered");
                return;
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
        insertTicketNum: function(ticketnum, userid){
            var updateticketnum = "UPDATE `User` SET `TicketNum` = '"+ ticketnum +"' WHERE `User`.`ID` = "+ userid;
            connection.query(updateticketnum, function (err, result) {
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
