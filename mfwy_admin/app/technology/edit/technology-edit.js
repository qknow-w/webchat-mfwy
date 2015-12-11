/**
 * Created by Administrator on 2015/9/15 0015.
 */
angular.module("technology-edit", ["resource.cards"]).config([
    "$routeProvider", function ($routeProvider) {
        return $routeProvider.when("/technology/:pid/:cid", {
            templateUrl: "/app/technology/edit/technology-edit.tpl.html",
            controller: 'TechnologyEditCtrl',
            resolve: {
                technology: [
                    "$q", "$http", "$route", "Cards", function ($q, $http, $route, Cards) {
                        var deferred;
                        deferred = $q.defer();
                        $http.get(config.url.api + "/v1/cards/gongyi/" + $route.current.params.pid + "/" + $route.current.params.cid).success(function (data) {
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
        }).when("/technologies/new/:pid", {
            templateUrl: "/app/technology/edit/technology-edit.tpl.html",
            controller: 'TechnologyEditCtrl',
            resolve: {
                technology: function () {
                    return paper = {
                        name: "",//名称
                        price: "",//价格
                        images:"", //图片
                        num:""
                    };
                }
            }
        })
    }
])
    .controller("TechnologyEditCtrl", ["$scope", '$route', "$routeParams", "$location", "$rootScope", "$http", "FileUploader", "Cards", "technology", "messager",
        function ($scope, $route, $routeParams, $location, $rootScope, $http, FileUploader, Cards, technology, messager) {


            //正面上传
            var uploaderPoster = $scope.uploaderPoster = new FileUploader({
                url: "" + config.url.api + "/v1/file-upload/?path=card",
                removeAfterUpload:true
            });

            uploaderPoster.onCompleteItem = function (fileItem, response, status, headers) {
                console.log(response);
                $scope.entity.images=response;
                // uploaderPoster.clearQueue();
            };
            $scope.get = function () {
                $scope.entity = technology;
                // console.log($scope.entity.images.ad);
            };
            //modify
            $scope.modifyPaper = function () {
                if ($route.current.params.cid) {
                    $http.post(config.url.api + "/v1/cards/gongyi/" + $route.current.params.pid + "/" + $route.current.params.cid, $scope.entity).success(function (data) {
                        /*createOrder(data.value[0].c_type, data.value[0].gongyi);*/
                        messager.success("modify successfully.");
                        return $location.path("/technology");
                    }).error(function (error) {
                        return messager.success("modify fail");

                    });
                } else {
                    $http.post(config.url.api + "/v1/cards/gongyi/" + $route.current.params.pid, $scope.entity).success(function (data) {
                        /*createOrder(data.value[0].c_type, data.value[0].gongyi);*/
                        messager.success("add successfully.");
                        return $location.path("/technology");
                    }).error(function (error) {
                        return messager.success("add fail");

                    });
                }

            };


            return $scope.get();


        }]);