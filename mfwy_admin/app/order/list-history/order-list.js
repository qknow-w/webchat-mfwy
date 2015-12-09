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
    "$scope",'$http',"$location","Orders","messager",'ipCookie', function($scope,$http,$location,Orders,messager,ipCookie) {

        $scope.search="";
        //delete
        $scope.delete=function(id){
           return Orders["delete"]({id:id},function(){
               messager.success("delete successfully.");
               $scope.setPage(1);
           })
        };


        //search
        $scope.orderSearch = function() {
            if(ipCookie('currentAdd')=="0"){
                return $http.get(config.url.api+"/v1/orders/history/pagination/super?skip=0&top=10&search="+$scope.search).success(function(data) {
                    return $scope.data = data;
                }).error(function(error) {

                });
            }else{
                return $http.get(config.url.api+"/v1/orders/history/pagination/children?skip=0&top=10&currentAdd="+ipCookie('currentAdd')+"&search="+$scope.search).success(function(data) {
                    return $scope.data = data;
                }).error(function(error) {

                });
            }
        };


        $scope.setPage = function(pageNo) {
            if(ipCookie('currentAdd')=="0"){
                return $http.get(config.url.api+"/v1/orders/history/pagination/super?skip="+(pageNo - 1) * 10+"&top=10&search="+$scope.search).success(function(data) {
                    return $scope.data = data;
                }).error(function(error) {

                });
            }else{
                return $http.get(config.url.api+"/v1/orders/history/pagination/children?skip="+(pageNo - 1) * 10+"&top=10&currentAdd="+ipCookie('currentAdd')+"&search="+$scope.search).success(function(data) {
                    return $scope.data = data;
                }).error(function(error) {

                });
            }

        };

        //import excel
        $scope.importOrder=function(){

            if(ipCookie('currentAdd')=="0"){
                window.location.href=config.url.api+"/v1/orders/excel/history/all/super?search="+$scope.search;

            }else{
                window.location.href=config.url.api+"/v1/orders/excel/history/all/children?currentAdd="+ipCookie('currentAdd')+"&search="+$scope.search;
            }


        };

        return $scope.setPage(1);

    }
]);
