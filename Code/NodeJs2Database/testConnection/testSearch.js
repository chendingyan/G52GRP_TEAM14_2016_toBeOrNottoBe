var mysql = require('mysql');
var Test_Database = 'test';
var Test_Table = 'stu';
var client = mysql.createConnection({
user:'root',
password:'chen123',
        });
client.connect();
client.query("use " + Test_Database);
client.query('select * from '+ Test_Table, function selectCb(err, results, fields){
        if(err){
                throw err;
        }
        if(results){
        for(var i = 0; i< results.length; i++){
        console.log("%d\t%s\t", results[i].id, results[i].name);
        }
        }
        client.end();
        });