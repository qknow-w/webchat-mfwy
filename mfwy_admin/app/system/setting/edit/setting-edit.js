/**
 * Created by Administrator on 2015/9/15 0015.
 */
angular.module("setting-edit", ["resource.setting"]).config([
    "$routeProvider", function ($routeProvider) {
        return $routeProvider.when("/system/setting/new", {
            templateUrl: "/app/system/setting/edit/setting.tpl.html",
            controller: 'SettingEditCtrl',
            resolve: {
                setting: [
                    "$q", "$route", "Setting", "ipCookie",function ($q, $route, Setting,ipCookie) {
                        var deferred;
                        deferred = $q.defer();
                        Setting.list({
                            $filter:"currentAdd eq '"+ipCookie('currentAdd')+"'"
                        },function (data) {
                            return deferred.resolve(data);
                        });
                        return deferred.promise;
                    }
                ]
            }
        })
    }
])
    .controller("SettingEditCtrl", ["$scope", "$routeParams", "$location", "$rootScope","$http", "Setting", "setting", "messager",'ipCookie',
        function ($scope, $routeParams, $location, $rootScope,$http,Setting, setting, messager,ipCookie) {
            var flag=true; //true 是修改  flase 新增
            $scope.get = function () {
                console.log(setting.value.length);
                if(setting.value.length==0){
                    flag=false;
                    $scope.entity ={
                        customerServicePhone:"",
                        currentAdd:""
                    }

                }else {
                    flag=true;
                    console.log(setting);
                    $scope.entity = setting.value[0]
                }



               // console.log($scope.entity.images.ad);
            };
            $scope.submit = function () {

                $scope.isSubmit = true;
                $scope.loading = "Saving";
                return save();
            };
            save = function () {
                var entity;
                $scope.loading = "Saving";
                entity = $scope.entity;

                if (flag==false) {
                    entity.currentAdd=ipCookie('currentAdd');
                    return Setting.post(entity, function (data) {
                        messager.success("save successfully.");
                    });
                } else {
                    return Setting.put({
                        id: "" + entity.id
                    }, entity, function (data) {

                        messager.success("modify successfully.");
                    });
                }
            };
            return $scope.get();


        }]);