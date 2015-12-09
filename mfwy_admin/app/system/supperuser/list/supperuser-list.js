/**
 * Created by Administrator on 2015/9/14 0014.
 */

angular.module('supperuser-list', ['resource.superusers']).config([
    "$routeProvider", function($routeProvider) {
        return $routeProvider.when("/system/supperuser", {
            templateUrl: "/app/system/supperuser/list/supperuser-list.tpl.html",
            controller: 'SupperuserCtrl'
        });
    }
]).controller('SupperuserCtrl', [
    "$scope","$location","SuperUsers","messager", function($scope,$location,SuperUsers,messager) {
        $scope.delete=function(id){
           return SuperUsers["delete"]({id:id},function(){
               messager.success("delete successfully.");
               $scope.setPage(1);
           })
        };

        $scope.setPage = function(pageNo) {
            return SuperUsers.list({
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
