var mysql = require('mysql');
var connection = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'chen123',
    port:'3306',
    database:'test',
});
connection.connect();
var insertSql = 'insert into stu values (4,"Tom");';
connection.query(insertSql,function (err, result) {
    if(err){
        console.log("error");
        throw err;
    }
    console.log('insert successful:', result);
});
connection.end();
