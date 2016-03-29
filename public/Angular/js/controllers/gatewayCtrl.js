var host = 'http://app3-demo.openshift.rasia'
app.controller('gatewayCtrl', ['$scope', '$http', 'DTOptionsBuilder', 'DTColumnBuilder', function($scope, $http, DTOptionsBuilder, DTColumnBuilder) {


    $scope.dtOptions = DTOptionsBuilder.fromSource(host + "/api/getGatewayByTenantID/4").withDataProp('data');
    $scope.dtColumns = [
        DTColumnBuilder.newColumn('gatewayID').withTitle('ID'),
        DTColumnBuilder.newColumn('gatewayName').withTitle('Gateway Name'),
        DTColumnBuilder.newColumn('gatewayIP').withTitle('Gateway IP')
    ];

    $scope.dtInstance = {};
    // $scope.searchtest = function() {
    //     $scope.dtOptions = DTOptionsBuilder
    //         .fromSource(host + "/api/getGatewayByTenantID/3").withDataProp('data');;
    //     $scope.dtInstance.reloadData();
    // }


}]);
