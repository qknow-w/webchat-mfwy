define('app', ['routers', 'services/dependencyResolverFor', 'angularAMD', 'uiRoute', 'jquery', 'config', 'swiper', 'ngSwiper', 'ngCookie'], function (config, dependencyResolverFor, angularAMD) {

    var app = angular.module('app', ['ui.router', 'ksSwiper', 'ipCookie']);


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
