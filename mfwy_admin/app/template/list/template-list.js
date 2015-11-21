/**
 * Created by Administrator on 2015/9/14 0014.
 */

angular.module('template-list', ['resource.templates']).config([
    "$routeProvider", function($routeProvider) {
        return $routeProvider.when("/template/0", {
            templateUrl: "/app/template/list/template-list.tpl.html",
            controller: 'TemplateCtrl'
        });
    }
]).controller('TemplateCtrl', [
    "$scope","$location","Templates","messager", function($scope,$location,Templates,messager) {
        $scope.delete=function(id){
           return Templates["delete"]({id:id},function(){
               messager.success("delete successfully.");
               $scope.setPage(1);
           })
        };

        $scope.setPage = function(pageNo) {
            return Templates.list({
                $skip: (pageNo - 1) * 10,
                $top: 10,
                $count: true,
                $filter:'type eq 0'
            }, function(data) {
                return $scope.data = data;

            });
        };

        return $scope.setPage(1);

    }
]);
