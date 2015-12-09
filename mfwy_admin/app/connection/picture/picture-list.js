/**
 * Created by Administrator on 2015/9/14 0014.
 */

angular.module('connection-picture', ['resource.pictures']).config([
    "$routeProvider", function($routeProvider) {
        return $routeProvider.when("/family", {
            templateUrl: "/app/connection/picture/picture-list.tpl.html",
            controller: 'FamilyCtrl'
        });
    }
]).controller('FamilyCtrl', [
    "$scope","$location","Pictures","messager",'ipCookie', function($scope,$location,Pictures,messager,ipCookie) {
        $scope.delete=function(id){
           return Pictures["delete"]({id:id},function(){
               messager.success("delete successfully.");
               $scope.setPage(1);
           })
        };

        $scope.setPage = function(pageNo) {
            if(ipCookie('currentAdd')=="0"){
                return Pictures.list({
                    $skip: (pageNo - 1) * 10,
                    $top: 10,
                    $count: true,
                    $filter:"states eq false"
                }, function(data) {
                    return $scope.data = data;

                });
            }else{
                return Pictures.list({
                    $skip: (pageNo - 1) * 10,
                    $top: 10,
                    $count: true,
                    $filter:"states eq false and currentAdd eq '"+ipCookie('currentAdd')+"'"
                }, function(data) {
                    return $scope.data = data;

                });
            }




        };

        return $scope.setPage(1);

    }
]);
