var host = 'http://localhost:8080';

app.controller('sensorCtrl', ['$scope', '$interval', '$rootScope', '$http', 'DTOptionsBuilder', 'DTColumnBuilder', '$compile',
    function($scope, $interval, $rootScope, $http, DTOptionsBuilder, DTColumnBuilder, $compile) {


        $scope.dtOptions = DTOptionsBuilder.fromSource(host + "/api/getSensorByTenantID/4")
            .withDataProp('data')
            .withOption('rowCallback', rowCallback)
            .withOption('createdRow', createdRow)
        $scope.dtColumns = [
            DTColumnBuilder.newColumn('sensorID').withTitle('').renderWith(renderIcon),
            DTColumnBuilder.newColumn('sensorID').withTitle('ID'),
            DTColumnBuilder.newColumn('sensorMAC').withTitle('MAC Address'),
            DTColumnBuilder.newColumn('sensorType').withTitle('Type'),
            DTColumnBuilder.newColumn('sensorIP').withTitle('IP Address'),
            DTColumnBuilder.newColumn('h2s').withTitle('H2S'),
            DTColumnBuilder.newColumn('temp').withTitle('Temp'),
            DTColumnBuilder.newColumn('heartbeat').withTitle('Heartbeat')
        ];

        $scope.dtInstance = {};
        $scope.searchtest = function() {
            $scope.dtOptions = DTOptionsBuilder
                .fromSource(host + "/api/getSensorByTenantID/3").withDataProp('data');;
            $scope.dtInstance.reloadData();
        }

        function createdRow(row, data, dataIndex) {}
        $scope.tab = 1;

        function renderIcon(data) {
            return '<i class="glyphicon glyphicon-plus-sign"></i>';
        }

        function rowCallback(tabRow, data, dataIndex) {
            $(tabRow).unbind('click');
            $(tabRow).on('click', function() {

                var icon = $(this).find('.glyphicon');
                var tr = $(tabRow);
                var table = $scope.dtInstance.DataTable;
                var row = table.row(tr);
                var scope = $scope.$new(true);
                scope.tab = 1;
                if (row.child.isShown()) {
                    icon.removeClass('glyphicon-minus-sign').addClass('glyphicon-plus-sign');
                    // This row is already open - close it
                    row.child.hide();
                    tr.removeClass('shown');
                } else {
                    icon.removeClass('glyphicon-plus-sign').addClass('glyphicon-minus-sign');
                    row.child($compile('<div tmpl class="clearfix"></div>')(scope)).show();
                    childInfoDetail(row.data(), scope);
                    childHistory(row.data(), scope);

                    tr.addClass('shown');
                    row.data() = {};
                }
            });
        }

        var childInfoDetail = function(data, scope) {
            var sensorID = data.sensorID;
            $http.get('/api/getDetailSensor/' + sensorID).then(function(resutl) {
                scope.sensorDetail = resutl.data.data[0];
            });
        }

        var childHistory = function(data, scope) {
            var sensorID = data.sensorID;
            $http.get('/api/getTopFiveHistory/' + sensorID).then(function(resutl) {
                scope.topFive = resutl.data.data;
            })
        }

        $scope.exportFile = function() {
            var blob = new Blob([document.getElementById('sensorTable').innerHTML], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
            });
            saveAs(blob, "Report.xls");
        }

        var stop;
        $scope.reLoad = function() {
            stop = $interval(reloadData, $scope.iInterval * 1000);
        }

        function reloadData() {
            $scope.dtOptions = DTOptionsBuilder
                .fromSource(host + "/api/getSensorByTenantID/4").withDataProp('data');
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
    }
]);

app.directive('tmpl', testComp);

function testComp($compile) {
    console.log('sss');
    var directive = {};
    directive.restrict = 'A';
    directive.templateUrl = 'sensor-detail.ejs';
    directive.transclude = true;
    directive.link = function(scope, element, attrs) {

    }
    return directive;
}


// function format(row, tr) {
//     $rootScope.sensorID = row.data().sensorID;
//     console.log($rootScope.sensorID);


//     $http.get(host + '/api/getDetailSensor/' + $rootScope.sensorID).then(function(resutl, err) {
//         $scope.dataSensorDetail = resutl.data.data;
//         for (var inxdex in $scope.dataSensorDetail.data) {
//             console.log(inxdex);
//         }
//     });
// };
