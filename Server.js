var express = require("express");
var mysql   = require("mysql");
var bodyParser  = require("body-parser");
var md5 = require('MD5');
var rest = require("./REST.js");
var client = require("./client.js");
var test = require("./test.js");
var config = require('./config'); // get our config file
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var expressLayouts = require('express-ejs-layouts');
var app  = express();
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ipadr = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
function REST(){
    var self = this;
    self.connectMysql();
};

REST.prototype.connectMysql = function() {
    var self = this;
    var pool      =    mysql.createPool({
        connectionLimit : 100,
        host     : '172.16.0.68',
        user     : 'dev',
        password : 'dev123',
        database : 'rutledge',
        debug    :  false
    });
    pool.getConnection(function(err,connection){
        if(err) {
          self.stop(err);
        } else {
          self.configureExpress(connection);
        }
    });
}



REST.prototype.configureExpress = function(connection) {
      var self = this;
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
      app.use(express.static(__dirname + '/public/'));
      app.use(express.static(__dirname + '/views/'));




      app.use(function(req, res, next) {
         res.header("Access-Control-Allow-Origin", "*");
         res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
         res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Cache-Control");
         if (req.method === 'OPTIONS') {
          res.statusCode = 204;
          return res.end();
        } else {
          return next();
        }
      });

      
      app.set('view engine', 'ejs');
      app.set('layout', 'layouts/layout'); // defaults to 'layout'
      app.use(expressLayouts);

      var router = express.Router();
      app.use('/api', router);
      var rest_router = new rest(router,connection,md5);


      var client_router = express.Router();
      app.use("/",client_router);
      var client_router_test = new client(client_router,connection,md5);

      var test_router = express.Router();
      app.use("/testsample",test_router);
      var test_router_test = new test(test_router,connection,md5);

      self.startServer();
}

REST.prototype.startServer = function() {
      app.listen(port,function(){
          console.log("All right ! I am alive at Port '"+port+"'.");
      });
}

REST.prototype.stop = function(err) {
    console.log("ISSUE WITH MYSQL \n" + err);
    process.exit(1);
}

new REST();
