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
    "$scope",'$http',"$location","Orders","messager",'ipCookie', function($scope,$http,$location,Orders,messager,ipCookie) {

        $scope.search="";
        //delete order
        $scope.orderDelete=function(id,pageNo){
            return $http.post(config.url.api+"/v1/orders/delete", {"id":id}).success(function(data) {
                messager.success("delete successfully.");
                $scope.setPage(pageNo);
            }).error(function(error) {
                messager.success("delete fail.");
            });

        };
        // page
        $scope.setPage = function(pageNo) {
            return $http.get(config.url.api+"/v1/orders/pagination?skip="+(pageNo - 1) * 10+"&top=10&currentAdd="+ipCookie('currentAdd')+"&search="+$scope.search).success(function(data) {
                return $scope.data = data;
            }).error(function(error) {

            });
        };

        // 发货
        $scope.orderSend=function(id,pageNo){
            return $http.post(config.url.api+"/v1/orders/send", {"id":id}).success(function(data) {
                messager.success("发货成功");
                $scope.setPage(pageNo);
            }).error(function(error) {
                messager.success("发货失败，请重新发货");
            });

        };

        //search
        $scope.orderSearch = function() {
            return $http.get(config.url.api+"/v1/orders/pagination?skip=0&top=10&currentAdd="+ipCookie('currentAdd')+"&search="+$scope.search).success(function(data) {
                return $scope.data = data;
            }).error(function(error) {

            });
        };

        //import excel
        $scope.importOrder=function(){
            window.location.href=config.url.api+"/v1/orders/excel/all?currentAdd="+ipCookie('currentAdd')+"&search="+$scope.search;

        };





        return $scope.setPage(1);

    }
]);
