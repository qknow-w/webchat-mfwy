/**
 * Created by Administrator on 2015/9/14 0014.
 */

angular.module('activity-list', ['resource.activities']).config([
    "$routeProvider", function($routeProvider) {
        return $routeProvider.when("/activity", {
            templateUrl: "/app/activity/list/activity-list.tpl.html",
            controller: 'ActivityCtrl'
        });
    }
]).controller('ActivityCtrl', [
    "$scope","$location","Activities","messager", function($scope,$location,Activities,messager) {
        $scope.delete=function(id){
           return Activities["delete"]({id:id},function(){
               messager.success("delete successfully.");
               $scope.setPage(1);
           })
        };

        $scope.setPage = function(pageNo) {
            return Activities.list({
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
