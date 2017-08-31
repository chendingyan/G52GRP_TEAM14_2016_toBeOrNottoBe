var mysql = require('mysql');
var connection = mysql.createConnection({
    host : '127.0.0.1',
    user : 'root',
    password : 'chen123',
    port : '3306',
    database : 'test',
});

var deleteSql = 'delete from stu where id = 4;';
connection.query(deleteSql, function (err, result) {
    if(err){
        throw err;
    }
    console.log('Delete affected rows: ', result.affectedRows);

});
connection.end();
