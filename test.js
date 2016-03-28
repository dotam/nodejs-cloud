var mysql   = require("mysql");
var request = require('request');

var json2csv = require('json2csv');
var fs = require('fs');
var fields = ['car', 'price', 'color'];
var data_fields = ['macAddress','sensorType','ip','user','group','tenant'];
var fieldNames = ['MacAddress','SensorType','IP','User','Group','Tenant'];
var data = null;
var myCars = [
  {
    "car": "Audi",
    "price": 40000,
    "color": "blue",
    "value": 10

  }, {
    "car": "BMW",
    "price": 35000,
    "color": "black",
    "value": 11
  }, {
    "car": "Porsche",
    "price": 60000,
    "color": "green",
    "value": 12
  }
];



function REST_ROUTER(test_router,connection,md5) {
    var self = this;
    self.handleRoutes(test_router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes = function(test_router,connection,md5) {
    var self = this;

    test_router.get("/",function(req,res){
        res.render("test");
    });

    test_router.get("/csv", function(req,res){

    	var ab = request('http://localhost:8080/api/getallsensor', function (error, response, body) {
		  if (!error && response.statusCode == 200) {

		  	data = JSON.parse(body).sensor_info;

		  	var opts = {
			  data: data,
			  fields: data_fields,
			  fieldNames: fieldNames,
			  quotes: ''
			};

	  		json2csv(opts, function(err, csv) {
			  if (err) console.log(err);
			  fs.writeFile(__dirname+'/public/file.csv', csv, function(err) {
			    if (err) throw err;
			    console.log('file saved');
			  });
			});
		  }
		}
		);
		res.end('abc');
    });

    
}

module.exports = REST_ROUTER;