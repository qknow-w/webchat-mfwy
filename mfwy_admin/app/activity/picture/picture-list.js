/**
 * Created by Administrator on 2015/9/24 0024.
 */
angular.module('activity-picture', ['resource.pictures']).config([
    "$routeProvider", function($routeProvider) {
        return $routeProvider.when("/picture/:id", {
            templateUrl: "/app/activity/picture/picture-list.tpl.html",
            controller: 'PictureCtrl'
        });
    }
]).controller('PictureCtrl', [
    "$scope","$location",'$routeParams',"$http","Pictures","messager", function($scope,$location,$routeParams,$http,Pictures,messager) {


        //É¾³ý
        $scope.delete = function (id) {
            var promise = $http({
                method: "delete",
                url: ""+config.url.api+"/v1/pictrues(" + id + ")"

            });
            promise.then(function (data) {
                return $scope.setPage(1);
            }, function (resp) {

            })
        };


        $scope.exam=function(id){
            return Pictures.put({id:id},{states:true},function(data){
                messager.success("through successfully.");
                return $scope.setPage(1);
            })
        };
        $scope.setPage = function(pageNo) {
            return Pictures.list({
                $skip: (pageNo - 1) * 10,
                $top: 10,
                $count: true,
                $filter:"activity eq '"+$routeParams.id+"'"
            }, function(data) {
                return $scope.data = data;
            });
        };

        return $scope.setPage(1);

    }
]);
