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
                        name: "",//����
                        price: "",//�۸�
                        images:"",
                        num:"",
                        display:[false,false,false,false,false],
                        gongyi:[],
                        defaultt:[""]
                    };
                }
            }
        })
    }
])
    .controller("PaperEditCtrl", ["$scope", '$route', "$routeParams", "$location", "$rootScope", "$http", "FileUploader", "Cards", "paper", "messager",'ipCookie',
        function ($scope, $route, $routeParams, $location, $rootScope, $http, FileUploader, Cards, paper, messager,ipCookie) {

            //�����ϴ�
            var uploaderPoster = $scope.uploaderPoster = new FileUploader({
                url: "" + config.url.api + "/v1/file-upload/?path=card",
                removeAfterUpload:true
            });

            uploaderPoster.onCompleteItem = function (fileItem, response, status, headers) {
                console.log(response);
                $scope.entity.images=response;
                // uploaderPoster.clearQueue();
            };

            //�õ����й���
            $scope.getAllGongYi=function(){
                $http.get(config.url.api + "/v1/cards/?$filter=currentAdd eq '"+ipCookie('currentAdd')+"'").success(function (data) {
                    /*createOrder(data.value[0].c_type, data.value[0].gongyi);*/

                    $scope.getAllGongYi=data.value[0].gongyi;
                    console.log(data.value[0].gongyi);
                }).error(function (error) {
                    console.log(error);

                });
            };






            $scope.get = function () {
                $scope.entity = paper;



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
            //��ʾģ��
            $scope.fn=function(){
                console.log($scope.entity.display);
            };

            //ѡ����
            $scope.toggleSelection =function(id){
                console.log(id);
                var idx = $scope.entity.gongyi.indexOf(id);

                // is currently selected
                if (idx > -1) {
                    $scope.entity.gongyi.splice(idx, 1);
                }

                // is newly selected
                else {
                    $scope.entity.gongyi.push(id);
                }

                console.log($scope.entity.gongyi);
            };

            $scope.toggleSelectionRadio =function(id){
                console.log(id);
                var idx = $scope.entity.defaultt.indexOf(id);

                // is currently selected
                if (idx > -1) {
                    $scope.entity.defaultt.splice(idx, 1);
                }

                // is newly selected
                else {
                    $scope.entity.defaultt[0]=id;
                }
            };

            $scope.getAllGongYi();
            return $scope.get();


        }]);