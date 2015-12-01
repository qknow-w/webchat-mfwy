/**
 * Created by Administrator on 2015/9/15 0015.
 */
angular.module("paper-edit", ["resource.cards"]).config([
    "$routeProvider", function ($routeProvider) {
        return $routeProvider.when("/paper/:pid/:cid", {
            templateUrl: "/app/paper/edit/paper-edit.tpl.html",
            controller: 'PaperEditCtrl',
            resolve: {
                paper: [
                    "$q", "$http", "$route", "Cards", function ($q, $http, $route, Cards) {
                        var deferred;
                        deferred = $q.defer();
                        $http.get(config.url.api + "/v1/cards/ctype/" + $route.current.params.pid + "/" + $route.current.params.cid).success(function (data) {
                            /*createOrder(data.value[0].c_type, data.value[0].gongyi);*/
                            return deferred.resolve(data);
                        }).error(function (error) {
                            console.log(error);
                            return deferred.reject(void 0);
                        });
                        return deferred.promise;
                    }
                ]
            }
        }).when("/papers/new/:pid", {
            templateUrl: "/app/paper/edit/paper-edit.tpl.html",
            controller: 'PaperEditCtrl',
            resolve: {
                paper: function () {
                    return paper = {
                        name: "",//Ãû³Æ
                        price: ""//µØÖ·
                    };
                }
            }
        })
    }
])
    .controller("PaperEditCtrl", ["$scope", '$route', "$routeParams", "$location", "$rootScope", "$http", "FileUploader", "Cards", "paper", "messager",
        function ($scope, $route, $routeParams, $location, $rootScope, $http, FileUploader, Cards, paper, messager) {

            $scope.get = function () {
                $scope.entity = paper;
                console.log(paper);
                // console.log($scope.entity.images.ad);
            };
            //modify
            $scope.modifyPaper = function () {
                if ($route.current.params.cid) {
                    $http.post(config.url.api + "/v1/cards/ctype/" + $route.current.params.pid + "/" + $route.current.params.cid, $scope.entity).success(function (data) {
                        /*createOrder(data.value[0].c_type, data.value[0].gongyi);*/
                        messager.success("modify successfully.");
                        return $location.path("/paper");
                    }).error(function (error) {
                        return messager.success("modify fail");

                    });
                } else {
                    $http.post(config.url.api + "/v1/cards/ctype/" + $route.current.params.pid, $scope.entity).success(function (data) {
                        /*createOrder(data.value[0].c_type, data.value[0].gongyi);*/
                        messager.success("add successfully.");
                        return $location.path("/paper");
                    }).error(function (error) {
                        return messager.success("add fail");

                    });
                }

            };


            return $scope.get();


        }]);