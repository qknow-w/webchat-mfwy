/**
 * Created by Administrator on 2015/9/14 0014.
 */

angular.module('order-list-history', ['resource.orders']).config([
    "$routeProvider", function($routeProvider) {
        return $routeProvider.when("/historyOrder", {
            templateUrl: "/app/order/list-history/order-list.tpl.html",
            controller: 'OrderHistoryCtrl'
        });
    }
]).controller('OrderHistoryCtrl', [
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
                $filter:'states eq 3',
                $orderby:"createInfo desc"
            }, function(data) {
                return $scope.data = data;
            });
        };

        return $scope.setPage(1);

    }
]);
