/**
 * Created by Administrator on 2015/11/3 0003.
 */
define(['app'], function (app) {
    app.controller('TemplateController', ['$scope', '$rootScope','templateService', "$location", function ($scope,$rootScope, templateService,$location) {

        $scope.entity = "";


        $scope.tplskip=function(id,price,name){
            $rootScope.tpl={
                type:5,
                id:id,
                price:price,
                name:name
            };
            //跳转
            $location.path('/app/order/tpl');

        };

        //读取数据
        return templateService.tpl($rootScope.addressDefault.selectAdd).then(function (data) {
            $scope.entity = data;
        })
    }
    ]);
});