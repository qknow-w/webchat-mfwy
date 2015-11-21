/**
 * Created by Administrator on 2015/9/15 0015.
 */
angular.module("dingzhi-edit", ["resource.templates"]).config([
    "$routeProvider", function ($routeProvider) {
        return $routeProvider.when("/dingzhi/new", {
            templateUrl: "/app/dingzhi/edit/dingzhi-edit.tpl.html",
            controller: 'DingzhiEditCtrl',
            resolve: {
                dingzhi: function () {
                    return ab = {
                        name: "",//名称
                        price: "",//地址
                        card: {"c_type":"",gongyi:""},//时间  数组  开始时间和结束时间
                        info: {theme: "", sponsor: "", brief: ""},//另外的信息  主题、主办方、简介
                        images: []//图片  广告、海报
                    };
                }
            }
        }).when("/dingzhi/:id", {
            templateUrl: "/app/dingzhi/edit/dingzhi-edit.tpl.html",
            controller: 'DingzhiEditCtrl',
            resolve: {
                dingzhi: [
                    "$q", "$route", "Templates", function ($q, $route, Templates) {
                        var deferred;
                        deferred = $q.defer();
                        Templates.get({
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
    .controller("DingzhiEditCtrl", ["$scope", "$routeParams", "$location", "$rootScope","$http", "FileUploader", "Templates", "dingzhi", "messager",
        function ($scope, $routeParams, $location, $rootScope,$http, FileUploader,Templates, dingzhi, messager) {



            $scope.get = function () {

                $scope.entity = dingzhi;

               // console.log($scope.entity.images.ad);
            };
            var uploaderPoster = $scope.uploaderPoster = new FileUploader({
                url: "" + config.url.api + "/v1/file-upload/?path=template"
            });


            uploaderPoster.onCompleteItem = function (fileItem, response, status, headers) {
                $scope.entity.images.push(response)  ;
                // uploaderPoster.clearQueue();
            };
            $scope.submit = function () {

                $scope.isSubmit = true;
                $scope.loading = "Saving";
                if (uploaderPoster.getNotUploadedItems().length) {

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
                    entity.type=0;
                    return Templates.post(entity, function (data) {
                        messager.success("Save successfully.");
                    });
                } else {
                    return Templates.put({
                        id: "" + entity.id
                    }, entity, function (data) {

                        messager.success("modify successfully.");
                        //return $location.path("/activity");
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