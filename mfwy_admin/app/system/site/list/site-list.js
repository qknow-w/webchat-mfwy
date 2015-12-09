/**
 * Created by Administrator on 2015/9/14 0014.
 */

angular.module('site-list', ['resource.sites']).config([
    "$routeProvider", function($routeProvider) {
        return $routeProvider.when("/system/site", {
            templateUrl: "/app/system/site/list/site-list.tpl.html",
            controller: 'SiteCtrl'
        });
    }
]).controller('SiteCtrl', [
    "$scope","$location","Sites","messager", function($scope,$location,Sites,messager) {
        $scope.delete=function(id){
           return Sites["delete"]({id:id},function(){
               messager.success("delete successfully.");
               $scope.setPage(1);
           })
        };

        $scope.setPage = function(pageNo) {
            return Sites.list({
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
