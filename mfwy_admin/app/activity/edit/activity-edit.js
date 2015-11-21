/**
 * Created by Administrator on 2015/9/15 0015.
 */
angular.module("activity-edit", ["resource.activities"]).config([
    "$routeProvider", function ($routeProvider) {
        return $routeProvider.when("/activity/new", {
            templateUrl: "/app/activity/edit/activity-edit.tpl.html",
            controller: 'ActivityEditCtrl',
            resolve: {
                activity: function () {
                    return ac = {
                        name: "",//名称
                        address: "",//地址
                        time: [new Date(), new Date()],//时间  数组  开始时间和结束时间
                        info: {theme: "", sponsor: "", brief: ""},//另外的信息  主题、主办方、简介
                        images: {ad: ["", ""], poster: ["", ""], posterr: ["", ""]}//图片  广告、海报
                    };
                }
            }
        }).when("/activity/:id", {
            templateUrl: "/app/activity/edit/activity-edit.tpl.html",
            controller: 'ActivityEditCtrl',
            resolve: {
                activity: [
                    "$q", "$route", "Activities", function ($q, $route, Activities) {
                        var deferred;
                        deferred = $q.defer();
                        Activities.get({
                            id: $route.current.params.id
                        }, function (data) {
                            return deferred.resolve(data);
                        });
                        return deferred.promise;
                    }
                ]
            }
        })
    }
])
    .controller("ActivityEditCtrl", ["$scope", "$routeParams", "$location", "$rootScope","$http", "FileUploader", "Activities", "activity", "messager",
        function ($scope, $routeParams, $location, $rootScope,$http, FileUploader,Activities, activity, messager) {



            $scope.get = function () {

                $scope.entity = activity;

               // console.log($scope.entity.images.ad);
            };
            var uploaderAd = $scope.uploaderAd = new FileUploader({
                url: "" + config.url.api + "/file-upload/?path=activity"
            });
            var uploaderPoster = $scope.uploaderPoster = new FileUploader({
                url: "" + config.url.api + "/file-upload/?path=activity"
            });
            var uploaderPosterr = $scope.uploaderPosterr = new FileUploader({
                url: "" + config.url.api + "/file-upload/?path=activity"
            });
            uploaderAd.onCompleteItem = function (fileItem, response, status, headers) {
                $scope.entity.images.ad[1] = response;
                // ad=response;
                // uploaderAd.clearQueue();
            };
            uploaderPoster.onCompleteItem = function (fileItem, response, status, headers) {
                $scope.entity.images.poster[1] = response;
                // uploaderPoster.clearQueue();
            };

            uploaderPosterr.onCompleteItem = function (fileItem, response, status, headers) {
                $scope.entity.images.posterr[1] = response;
                // uploaderPoster.clearQueue();
            };
            $scope.submit = function () {

                $scope.isSubmit = true;
                $scope.loading = "Saving";
                if (uploaderAd.getNotUploadedItems().length || uploaderPoster.getNotUploadedItems().length) {

                    $scope.loading = "请先上传";
                } else {
                    return save();
                }
            };

            save = function () {
                var entity;
                $scope.loading = "Saving";
                entity = $scope.entity;
               /* entity.images = {"ad": [$scope.entity.adUrl, ad], "poster": [$scope.entity.posterUrl, poster]};
                entity.time = [$scope.entity.startTime, $scope.entity.endTime];

                delete $scope.entity.startTime;
                delete $scope.entity.endTime;
                delete  $scope.entity.adUrl;
                delete  $scope.entity.posterUrl;
                entity.statistics = [0, 0, 0];*/
                if (!$routeParams.id) {
                    return Activities.post(entity, function (data) {
                        var promise = $http({
                            method:"post",
                            url:""+config.url.api+"/qrcode",
                            data:{"id":data.id}
                        });

                        promise.then(function(resp){
                            messager.success("Save successfully.");
                             return $location.path("/activity");
                        }, function(resp){})


                    });
                } else {
                    return Activities.put({
                        id: "" + entity.id
                    }, entity, function (data) {

                        messager.success("modify successfully.");
                        return $location.path("/activity");
                        /*var promise = $http({
                            method:"post",
                            url:""+config.url.api+"/qrcode",
                            data:{"id":data.id}
                        });

                        promise.then(function(resp){
                            messager.success("modify successfully.");
                            return $location.path("/activity");
                        }, function(resp){})*/
                    });
                }
            };
            $scope.modify = function () {

                $scope.isSubmit = true;
                $scope.loading = "Modifing";
                save();
            };
            saveModify = function () {
                var entity;
                $scope.loading = "Saving";
                entity = $scope.entity;
                return Activities.put({
                    id: "" + entity.id
                }, entity, function (data) {
                    return messager.success("Save successfully.");
                });
            };




            return $scope.get();


        }]);