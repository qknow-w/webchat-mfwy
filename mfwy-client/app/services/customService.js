/**
 * Created by Administrator on 2015/11/8 0008.
 */
define(['app'], function (app) {
    app.factory('customService', ['$q','$http', function ($q,$http) {

        custom=function(){
            var deferred;
            deferred = $q.defer();
            $http.get(config.url.api+"/v1/templates?$filter=type%20eq%201", void 0).success(function(data) {
               return deferred.resolve(data.value);
            }).error(function(error) {
                console.log(error);
                return deferred.reject(void 0);
            });
            return deferred.promise;
        };
            order=function(str){
                console.log(str);
                var deferred;
                deferred=$q.defer();
                $http.post(config.url.api+"/v1/orders",str).success(function(data){

                }).error(function(error){
                    alert("提交订单错误，请重新提交");
                    console.log(data);
                    return deferred.reject(void 0);
                });
                return deferred.promise;
            };
       custom_1=function(str){
           var deferred;
           deferred = $q.defer();
           $http.get(config.url.api+"/v1/templates("+str+")", void 0).success(function(data) {
               return deferred.resolve(data);
           }).error(function(error) {
               console.log(error);
               return deferred.reject(void 0);
           });
           return deferred.promise;
       }
        return {
            custom:custom,
            order:order,
            custom_1:custom_1
        }
    }]);
});