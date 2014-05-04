var mysql      	= require('mysql');
var _ 			= require('underscore');
var connection 	= mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : '****'
});


module.exports = function(cb){

	connection.connect();

	connection.query('SELECT url FROM post LIMIT 25 OFFSET 1000', function(err, rows, fields) {
	  if (err) throw err;

		cb(_.map(rows, function(row){
			return row.url;
		}));  
	});

	connection.end();

}
