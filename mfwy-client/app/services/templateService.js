/**
 * Created by Administrator on 2015/11/8 0008.
 */
define(['app'], function (app) {
    app.factory('templateService', ['$q','$http', function ($q,$http) {
        list=function(){
            var deferred;
            deferred = $q.defer();
            $http.get(config.url.api+"/v1/cards", void 0).success(function(data) {
                console.log(data);
                return deferred.resolve(data.value);
            }).error(function(error) {
                console.log(error);
                return deferred.reject(void 0);
            });
            return deferred.promise;
        };
        tpl=function(){
            var deferred;
            deferred = $q.defer();
            $http.get(config.url.api+"/v1/templates?$filter=type%20eq%200", void 0).success(function(data) {

               return deferred.resolve(data.value);

            }).error(function(error) {
                console.log(error);
                return deferred.reject(void 0);
            });
            return deferred.promise;
        };

        order=function(str){
            var deferred;
            deferred=$q.defer();
            $http.post(config.url.api+"/v1/orders",str).success(function(data){
                return deferred.resolve(data.value);
            }).error(function(error){
                alert("提交订单错误，请重新提交");

                return deferred.reject(void 0);
            });
            return deferred.promise;
        };
        wechatConfig=function(){
            var deferred;
            deferred = $q.defer();
            $http.post(config.url.api+"/pay/order", void 0).success(function(data) {
                return deferred.resolve(data);
            }).error(function(error) {
                return deferred.reject(void 0);
            });
            return deferred.promise;
        };
        xiadan=function(str){
            var deferred;
            deferred = $q.defer();
            $http.get(config.url.api+"/v1/templates("+str+")", void 0).success(function(data) {
                console.log(data);
                return deferred.resolve(data);
            }).error(function(error) {
                console.log(error);
                return deferred.reject(void 0);
            });
            return deferred.promise;
        };
        return {
            list:list,
            tpl:tpl,
            order:order,
            xiadan:xiadan,
            getWechatConfig:wechatConfig,

        }
    }]);
});