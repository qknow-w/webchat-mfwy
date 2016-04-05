/**
 * Created by Administrator on 2015/9/15 0015.
 */
angular.module("template-edit", ["resource.templates"]).config([
    "$routeProvider", function ($routeProvider) {
        return $routeProvider.when("/template/new", {
            templateUrl: "/app/template/edit/template-edit.tpl.html",
            controller: 'TemplateEditCtrl',
            resolve: {
                template: function () {
                    return ac = {
                        num:"",
                        name: "",//����
                        price: "",//��ַ
                        card: {"c_type":"",gongyi:""},//ʱ��  ����  ��ʼʱ��ͽ���ʱ��
                        images: []//ͼƬ  ��桢����
                    };
                }
            }
        }).when("/template/:id", {
            templateUrl: "/app/template/edit/template-edit.tpl.html",
            controller: 'TemplateEditCtrl',
            resolve: {
                template: [
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
    .controller("TemplateEditCtrl", ["$scope", "$routeParams", "$location", "$rootScope","$http", "FileUploader", "Templates", "template", "messager",
        'ipCookie',function ($scope, $routeParams, $location, $rootScope,$http, FileUploader,Templates, template, messager,ipCookie) {



            $scope.get = function () {

                $scope.entity = template;

               // console.log($scope.entity.images.ad);
            };
            //�����ϴ�
            var uploaderPoster = $scope.uploaderPoster = new FileUploader({
                url: "" + config.url.api + "/v1/file-upload/?path=template",
                removeAfterUpload:true
            });

            uploaderPoster.onCompleteItem = function (fileItem, response, status, headers) {
                $scope.entity.images[0]=response  ;
                // uploaderPoster.clearQueue();
            };

            //�����ϴ�
            var uploaderPosterr = $scope.uploaderPosterr = new FileUploader({
                url: "" + config.url.api + "/v1/file-upload/?path=template",
                removeAfterUpload:true
            });


            uploaderPosterr.onCompleteItem = function (fileItem, response, status, headers) {
                $scope.entity.images[1]=response  ;
                // uploaderPoster.clearQueue();
            };

            //�����ϴ�
            var uploader3 = $scope.uploader3 = new FileUploader({
                url: "" + config.url.api + "/v1/file-upload/?path=template",
                removeAfterUpload:true
            });

            uploader3.onCompleteItem = function (fileItem, response, status, headers) {
                $scope.entity.images[2]=response  ;
                // uploaderPoster.clearQueue();
            };


            $scope.submit = function () {

                $scope.isSubmit = true;
                $scope.loading = "Saving";
                if (uploaderPoster.getNotUploadedItems().length) {

                    $scope.loading = "�����ϴ�";
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
                    entity.currentAdd=ipCookie('currentAdd');
                    return Templates.post(entity, function (data) {
                        messager.success("Save successfully.");
                        return $location.path("/template/0");

                    });
                } else {
                    return Templates.put({
                        id: "" + entity.id
                    }, entity, function (data) {

                        messager.success("modify successfully.");
                        return $location.path("/template/0");
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