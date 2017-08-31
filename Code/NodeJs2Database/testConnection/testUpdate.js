var mysql = require('mysql');
var connection = mysql.createConnection({
    host : '127.0.0.1',
    user : 'root',
    password : 'chen123',
    port : '3306',
    database : 'test',
});
connection.connect();
var updateSql = 'update stu set name = ? where id = ?';
var updateSql_params = ['Bob', 4];
connection.query(updateSql, updateSql_params, function (err, result) {
    if(err){
        console.log("error");
        throw err;
    }
    console.log("update affected rows: ", result.affectedRows);

});
connection.end();