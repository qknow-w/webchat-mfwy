angular.module("app", ['ngRoute', 'ngCookies', 'ngSanitize', "activity",'order','template','dingzhi','connection', 'system', 'dialogs', 'framework.controllers', 'zy.services', 'zy.directives', 'zy.filters', 'zy.untils', 'ngProgress', 'ngStorage', 'ngDialog', 'angularFileUpload', 'ui.utils', 'ui.bootstrap', 'ui.bootstrap.datetimepicker','dateRange'])
    .config([
        "$locationProvider", function ($locationProvider) {
            return $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
        }
    ]).config([
        "$routeProvider", function ($routeProvider) {
            return $routeProvider.otherwise({
                redirectTo: "/order"
            });
        }
    ]).run([
        'ngProgress', function (ngProgress) {
            return ngProgress.color('#5cb85c');
        }
    ]).run([
        "$rootScope", "security", "$location", "context", function ($rootScope, security, $location, context) {
            var current;
            current = $location.path();
            if (current !== '/login') {
                $rootScope.__returnUrl = current;
            }
            $location.path('/login').replace();
            return security.autoLogin().then(function (data) {
                context.account = {
                    name: data.name,
                    email: data.email
                };
                context.auth.admin = true;
                return $rootScope.$broadcast("loginSuccessed");
            }, function () {
                return $rootScope.$broadcast("logoutSuccessed");
            });
        }
    ]).run([
        "$rootScope", function ($rootScope) {
            return $rootScope.config = config;
        }
    ]);
