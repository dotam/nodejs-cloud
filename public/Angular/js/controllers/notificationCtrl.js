var host = 'http://app3-demo.openshift.rasia'
app.controller('notificationCtrl', ['$scope','$interval', '$http','$filter', 'DTOptionsBuilder', 'DTColumnBuilder', function($scope,$interval, $http,$filter, DTOptionsBuilder, DTColumnBuilder) {



	$http.get(host+"/api/getNotification").then(function(response){
		console.log(response);
	});
    $scope.dtOptions = DTOptionsBuilder.fromSource(host + "/api/getNotification").withDataProp('data');
    $scope.dtColumns = [
        DTColumnBuilder.newColumn('notificationID').withTitle('ID'),
        DTColumnBuilder.newColumn('sensorID').withTitle('Sensor ID'),
        DTColumnBuilder.newColumn('h2s').withTitle('H2S').renderWith(renderStatusH2S),
        DTColumnBuilder.newColumn('temp').withTitle('Temp'),
        DTColumnBuilder.newColumn('heartbeat').withTitle('Heartbeat').renderWith(renderStatusHeart),
        DTColumnBuilder.newColumn('createDate').withTitle('Date').renderWith(renderDate)
    ];

    function renderStatusH2S(data,type,full){
    	return data >= 50 ? 'red' : 'green';
    };

    function renderStatusHeart(data) {
    	return data >= 100 ? 'red' : 'green';
    }

    function renderDate(data){
    	return $filter('date')(new Date(data), "dd MMM yyyy HH:mm:ss");
    }

  
    $scope.dtInstance = {};

    var stop;
    
    $scope.reLoad = function() {
        stop = $interval(reloadData, $scope.iInterval*1000);
    }

    function reloadData(){
          $scope.dtOptions = DTOptionsBuilder
            .fromSource(host + "/api/getNotification").withDataProp('data');
        $scope.dtInstance.reloadData();
    }

     $scope.stopLoad = function() {
      if (angular.isDefined(stop)) {
        $interval.cancel(stop);
        stop = undefined;
      }
    };

     $scope.$on('$destroy', function() {
        // Make sure that the interval is destroyed too
        $scope.stopLoad();
    });






}]);
