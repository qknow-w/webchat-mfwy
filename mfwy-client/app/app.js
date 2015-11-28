define('app', ['routers', 'services/dependencyResolverFor', 'angularAMD', 'uiRoute', 'jquery', 'config', 'swiper', 'ngSwiper', 'ngCookie'], function (config, dependencyResolverFor, angularAMD) {


    var app = angular.module('app', ['ui.router', 'ksSwiper', 'ipCookie']);

    app.controller("AppController", ["$rootScope", function ($rootScope) {
        //baidu map
        //当前位置
        $rootScope.currentAddress = [
            {
                value: "1",
                name: '甘肃省'

            },
            {
                value: "2",
                name: '山东省'

            }
        ];
        $rootScope.addressDefault={
            selectAdd:"1"
        };
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
    return angularAMD.bootstrap(app);
    //return app;
});
