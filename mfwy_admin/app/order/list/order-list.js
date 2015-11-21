/**
 * Created by Administrator on 2015/9/14 0014.
 */

angular.module('order-list', ['resource.orders']).config([
    "$routeProvider", function($routeProvider) {
        return $routeProvider.when("/order", {
            templateUrl: "/app/order/list/order-list.tpl.html",
            controller: 'OrderCtrl'
        });
    }
]).controller('OrderCtrl', [
    "$scope","$location","Orders","messager", function($scope,$location,Orders,messager) {
        $scope.delete=function(id){
           return Orders["delete"]({id:id},function(){
               messager.success("delete successfully.");
               $scope.setPage(1);
           })
        };

        $scope.setPage = function(pageNo) {
            return Orders.list({
                $skip: (pageNo - 1) * 10,
                $top: 10,
                $count: true,
                $filter:'states eq true'
            }, function(data) {
                return $scope.data = data;
            });
        };

        return $scope.setPage(1);

    }
]);
