/**
 * Created by Administrator on 2015/9/14 0014.
 */

angular.module('log-list', ['resource.logs']).config([
    "$routeProvider", function($routeProvider) {
        return $routeProvider.when("/system/log", {
            templateUrl: "/app/system/log/list/log-list.tpl.html",
            controller: 'LogCtrl'
        });
    }
]).controller('LogCtrl', [
    "$scope","$location","Logs","messager", function($scope,$location,Logs,messager) {
        /*$scope.delete=function(id){
           return Sites["delete"]({id:id},function(){
               messager.success("delete successfully.");
               $scope.setPage(1);
           })
        };*/

        $scope.setPage = function(pageNo) {
            return Logs.list({
                $skip: (pageNo - 1) * 10,
                $top: 10,
                $count: true
            }, function(data) {
                return $scope.data = data;
            });
        };

        return $scope.setPage(1);

    }
]);
