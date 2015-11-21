/**
 * Created by Administrator on 2015/9/14 0014.
 */

angular.module('connection-list', ['resource.connections']).config([
    "$routeProvider", function($routeProvider) {
        return $routeProvider.when("/connection", {
            templateUrl: "/app/connection/list/connection-list.tpl.html",
            controller: 'ConnectionCtrl'
        });
    }
]).controller('ConnectionCtrl', [
    "$scope","$location","Connections","messager", function($scope,$location,Connections,messager) {
        $scope.delete=function(id){
           return Connections["delete"]({id:id},function(){
               messager.success("delete successfully.");
               $scope.setPage(1);
           })
        };

        $scope.setPage = function(pageNo) {
            return Connections.list({
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
