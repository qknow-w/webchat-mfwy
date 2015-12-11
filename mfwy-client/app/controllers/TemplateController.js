/**
 * Created by Administrator on 2015/11/3 0003.
 */
define(['app'], function (app) {
    app.controller('TemplateController', ['$scope', '$rootScope','templateService', "$location", function ($scope,$rootScope, templateService,$location) {




        //$scope.reddit = new templateService.Reddit();


        var _page = 0;
        $scope.entity = [];
        $scope.LoadDetails = function() {
            _page++;
            templateService.tpl($rootScope.addressDefault.selectAdd,_page).then(function (data) {
                console.log(data);
                $scope.entity =$scope.entity.concat(data);
            });



        };

        $scope.tplskip=function(id,price,name,images){
            $rootScope.tpl={
                type:5,
                id:id,
                price:price,
                name:name,
                images:images||[]
            };
            //跳转
            $location.path('/app/order/tpl');

        };
        return $scope.LoadDetails();
       /* //读取数据
        return templateService.tpl($rootScope.addressDefault.selectAdd).then(function (data) {
            $scope.entity = data;
        })*/
    }
    ]);
});