/**
 * Created by Administrator on 2015/9/14 0014.
 */

angular.module('adv-list', ['resource.adv']).config([
    "$routeProvider", function($routeProvider) {
        return $routeProvider.when("/system/adv", {
            templateUrl: "/app/adv/list/adv-list.tpl.html",
            controller: 'AdvCtrl'
        });
    }
]).controller('AdvCtrl', [
    "$scope","$location","Adv","messager",'ipCookie','ngDialog', function($scope,$location,Adv,messager,ipCookie,ngDialog) {
        $scope.delete=function(id){
           return Adv["delete"]({id:id},function(){
               messager.success("delete successfully.");
               $scope.setPage(1);
           })
        };

        $scope.setPage = function(pageNo) {
            return Adv.list({
                $skip: (pageNo - 1) * 10,
                $top: 10,
                $count: true,
                $filter:"currentAdd eq '"+ipCookie('currentAdd')+"'"
            }, function(data) {
                return $scope.data = data;

            });
        };

        //新增广告 dialog
        $scope.uploadFile=function(){
            ngDialog.open({
                template: '/app/adv/upload/upload-edit.tpl.html',
                controller: 'UploadDialogCtrlAdv',
                scope:$scope
            });
        };

        return $scope.setPage(1);

    }
]);
