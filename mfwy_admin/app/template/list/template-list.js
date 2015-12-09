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
    "$scope","$location","Templates","messager",'ipCookie', function($scope,$location,Templates,messager,ipCookie) {
        $scope.delete=function(id){
           return Templates["delete"]({id:id},function(){
               messager.success("delete successfully.");
               $scope.setPage(1);
           })
        };

        $scope.setPage = function(pageNo) {
            if(ipCookie('currentAdd')=="0"){
                return Templates.list({
                    $skip: (pageNo - 1) * 10,
                    $top: 10,
                    $count: true,
                    $filter:"type eq 0"
                }, function(data) {
                    return $scope.data = data;

                });
            }else{
                return Templates.list({
                    $skip: (pageNo - 1) * 10,
                    $top: 10,
                    $count: true,
                    $filter:"type eq 0 and currentAdd eq '"+ipCookie('currentAdd')+"'"
                }, function(data) {
                    return $scope.data = data;

                });
            }



        };

        return $scope.setPage(1);

    }
]);
