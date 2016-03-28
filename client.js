var mysql = require("mysql");
var request = require('request');
var host = "http://localhost:8080";
var async = require('async');

function REST_ROUTER(client_router, connection, md5) {
    var self = this;
    self.handleRoutes(client_router, connection, md5);
}

REST_ROUTER.prototype.handleRoutes = function(client_router, connection, md5) {
    var self = this;

    client_router.get("/", function(req, res) {
        res.render("index");
    });

    client_router.get("/sensor", function(req, res) {
        async.waterfall([
            function(callback) {
                request(host + '/api/getAllTenant', function(err, res, body) {
                    callback(null,body);
                });
            }
        ], function(err, data) {
            data=JSON.parse(data);
            res.render("sensor", { data: data.data});
        });
    });

    client_router.get("/gateway", function(req, res) {
        res.render("gateway");
    });

    client_router.get("/notification", function(req, res) {
        res.render("notification");
    });

    client_router.get("/sensor-detail", function(req, res) {
        var data = "a";
        res.render("sensor-detail", { layout: false, data: data });
    });
}

module.exports = REST_ROUTER;