var host = 'http://localhost:8080';

app.factory('tenant', ['$http', function($http) {
	console.log(tenant);
    return $http.get(host+'/api/getAllTenant')
        .success(function(data) {
            return data;
        })
        .error(function(err) {
            return err;
        });
}]);

app.factory('tenantDetail', ['$http', function($http) {
    return $http.get(host+'/api/getSensorByTenantID/'+tenantID)
        .success(function(data) {
            return data;
        })
        .error(function(err) {
            return err;
        });
}]);
