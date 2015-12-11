define('app', ['routers', 'services/dependencyResolverFor', 'angularAMD', 'uiRoute', 'jquery', 'config', 'swiper', 'ngSwiper', 'ngCookie'], function (config, dependencyResolverFor, angularAMD) {


    var app = angular.module('app', ['ui.router', 'ksSwiper', 'ipCookie']);

    app.controller("AppController", ["$rootScope",'$scope', '$http','ipCookie',function ($rootScope,$scope,$http,ipCookie) {
        //baidu map
        //当前位置



        $rootScope.addressDefault={
            selectAdd:"a235ab81-d42e-4b99-b593-86ef274bf0b9"
        };
        //读取站点
        $scope.site=function(){
            $http.get("http://17quay.cn/v1/sites?$select=id,name", void 0).success(function(data) {
                $rootScope.currentAddress=data.value;
            }).error(function(error) {
                $rootScope.currentAddress=[];
            });
        };

        $scope.changeAddAdv=function(){
            $http.get("http://17quay.cn/v1/adv?$filter=currentAdd eq '"+$rootScope.addressDefault.selectAdd+"'", void 0).success(function(data) {
                $scope.advImages=data.value;
            }).error(function(error) {
                $scope.advImages=[];
            });
        };




        //图片路径
        $scope.imagesPath = "http://17quay.cn/v1/images?name=";


        //读取后台广告
        $scope.adv=function(){
            $http.get("http://17quay.cn/v1/adv?$filter=currentAdd eq '"+$rootScope.addressDefault.selectAdd+"'", void 0).success(function(data) {
                $scope.advImages=data.value;
            }).error(function(error) {
                $scope.advImages=[];
            });
        };


        $scope.site();
        return  $scope.adv();





        //default selected
       // $rootScope.addressDefault.selectAdd="1";
/*        $scope.addressChange=function(){

        };*/
/*
        $rootScope.app_address = "";
        var geolocation = new BMap.Geolocation();
        $rootScope.app_address = "当前位置";
        return geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                $rootScope.app_address = r.address.city;
                $rootScope.$apply();//apply
                /!* alert('当前位置' + r.address.city);
                 alert('当前位置' + $rootScope.app_address);*!/
            }


        }, {enableHighAccuracy: true});
*/

    }]);
    app.config([
        '$locationProvider',
        '$controllerProvider',
        '$compileProvider',
        '$filterProvider',
        '$provide',
        '$stateProvider',
        "$urlRouterProvider",
        function ($locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $stateProvider, $urlRouterProvider) {
            app.controller = $controllerProvider.register;
            app.directive = $compileProvider.directive;
            app.filter = $filterProvider.register;
            app.factory = $provide.factory;
            app.service = $provide.service;

            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });

            //load routers
            if (config.routes !== undefined) {
                angular.forEach(config.routes, function (route, path) {
                    var views = {};
                    angular.forEach(route.views, function (value, key) {
                        views[key] = {"templateUrl": value};
                    });
                    $stateProvider.state(path, {
                        url: route.url,
                        views: views,
                        resolve: dependencyResolverFor(route.dependencies)
                    });

                });
            }
            if (config.defaultRoutePath !== undefined) {
                $urlRouterProvider.otherwise(config.defaultRoutePath);
            }
        }
    ]);
    app.run(["$rootScope", "$location", 'ipCookie', function ($rootScope, $location, ipCookie) {
        ipCookie("openid", $location.search()['openid']);
        //console.log($location.search()['openid'])  ;


    }]);

    app.directive('focusMe', function($timeout) {
        return {
            scope: { trigger: '@focusMe' },
            link: function(scope, element) {
                scope.$watch('trigger', function(value) {
                    if(value === "true") {
                        $timeout(function() {
                            element[0].focus();
                        });
                    }
                });
            }
        };
    });


    return angularAMD.bootstrap(app);
    //return app;
});
