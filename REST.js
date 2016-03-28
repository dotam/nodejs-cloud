var mysql   = require("mysql");

function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes = function(router,connection,md5) {
    var self = this;

    router.get("/",function(req,res){
        res.send('Hello api.');
    });


    // router.get("/getAllSensor",function(req,res){
    //     var query = "SELECT macAddress,sensorType,ip,user,`group`,tenant FROM ??";
    //     var table = ["sensor"];
    //     query = mysql.format(query,table);
    //     connection.query(query,function(err,rows){
    //         if(err) {
    //             res.json({"Error" : true, "Message" : "Error executing MySQL query"});
    //         } else {
    //             res.json({"Error" : false, "Message" : "Success", "data" : rows});
    //         }
    //     });
    // });

    // router.get("/filterSensorByGroup/:group",function(req,res){
    //     var query = "SELECT macAddress,sensorType,ip,user,`group`,tenant FROM ?? WHERE ??=?";
    //     var table = ["sensor","group",req.params.group];
    //     query = mysql.format(query,table);
    //     connection.query(query,function(err,rows){
    //         if(err) {
    //             res.json({"Error" : true, "Message" : "Error executing MySQL query"});
    //         } else {
    //             res.json({"Error" : false, "Message" : "Success", "data" : rows});
    //         }
    //     });
    // });

    // router.get("/filterSensorByUser/:user",function(req,res){
    //     var query = "SELECT macAddress,sensorType,ip,user,`group`,tenant FROM ?? WHERE ??=?";
    //     var table = ["sensor","user",req.params.user];
    //     query = mysql.format(query,table);
    //     connection.query(query,function(err,rows){
    //         if(err) {
    //             res.json({"Error" : true, "Message" : "Error executing MySQL query"});
    //         } else {
    //             res.json({"Error" : false, "Message" : "Success", "data" : rows});
    //         }
    //     });
    // });

    router.get("/getSensorByTenantID/:tenantID",function(req,res){
        var query = "SELECT sensorID,sensorMAC,sensorType,sensorIP,h2s,temp,heartbeat FROM ?? WHERE ??=?";
        var table = ["sensor","tenantID",req.params.tenantID];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "data" : rows});
            }
        });
    });

    router.get("/getAllTenant",function(req,res){
        var query = "SELECT tenantID,tenantName FROM ??";
        var table = ["tenant"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "data" : rows});
            }
        });
    });

    router.get("/getDetailSensor/:sensorID",function(req,res){
        var query = "SELECT sensorID,sensorMAC,sensorType,sensorIP,h2s,temp,heartbeat,userName,groupName,tenantName FROM sensor,`group`,user,tenant WHERE sensor.userID=user.userID and sensor.groupID=`group`.groupID and sensor.tenantID=tenant.tenantID and ??=?";
        var table = ["sensorID",req.params.sensorID];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "data" : rows});
            }
        });
    });

    router.get("/getTopFiveHistory/:sensorID",function(req,res){
        var query = "SELECT h2s,temp,heartbeat,createDate FROM ?? WHERE ??=? ORDER BY createDate LIMIT 5";
        var table = ["history","sensorID",req.params.sensorID];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "data" : rows});
            }
        });
    });

    router.get("/getGatewayByTenantID/:tenantID",function(req,res){
        var query = "SELECT gatewayID,gatewayName,gatewayIP FROM ?? WHERE ??=?";
        var table = ["gateway","tenantID",req.params.tenantID];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "data" : rows});
            }
        });
    });


    router.get("/getNotification",function(req,res){
        var query = "SELECT notificationID,sensorID,h2s,heartbeat,temp,createDate FROM notification";
        query = mysql.format(query);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "data" : rows});
            }
        });
    });
}

module.exports = REST_ROUTER;