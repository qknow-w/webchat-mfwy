/**
 * Created by Administrator on 2015/11/14 0014.
 */
/**
 * Created by Administrator on 2015/11/8 0008.
 */
define(['app'], function (app) {
    app.factory('myorderService', ['$q','$http', function ($q,$http) {
        //所有订单
        list=function(openid){
            var deferred;
            deferred = $q.defer();
            $http.get(config.url.api+"/v1/orders?$filter=openid eq '"+openid+"'&$orderby=states asc,createInfo desc", void 0).success(function(data) {
                 /*createOrder(data.value[0].c_type, data.value[0].gongyi);*/
                return deferred.resolve(data.value);
            }).error(function(error) {
                return deferred.reject(void 0);
            });
            return deferred.promise;
        };
        //未付款
        notPay=function(openid){
            var deferred;
            deferred = $q.defer();
            $http.get(config.url.api+"/v1/orders?$filter=states eq 0 and openid eq '"+openid+"'&$orderby=states asc,createInfo desc", void 0).success(function(data) {
                /*createOrder(data.value[0].c_type, data.value[0].gongyi);*/
                return deferred.resolve(data.value);
            }).error(function(error) {
                return deferred.reject(void 0);
            });
            return deferred.promise;
        };
        //未发货
        notDelivery=function(){
            var deferred;
            deferred = $q.defer();
            $http.get(config.url.api+"/v1/orders?filter=states eq 1", void 0).success(function(data) {
                console.log("data", data.value[0]);
                /*createOrder(data.value[0].c_type, data.value[0].gongyi);*/
                return deferred.resolve(data.value);
            }).error(function(error) {
                console.log(error);
                return deferred.reject(void 0);
            });
            return deferred.promise;
        };
        //待收货
        notDelivery=function(){
            var deferred;
            deferred = $q.defer();
            $http.get(config.url.api+"/v1/orders?filter=states eq 2", void 0).success(function(data) {
                console.log("data", data.value[0]);
                /*createOrder(data.value[0].c_type, data.value[0].gongyi);*/
                return deferred.resolve(data.value);
            }).error(function(error) {
                console.log(error);
                return deferred.reject(void 0);
            });
            return deferred.promise;
        };
        return {list:list,
            notPay:notPay

        }
    }]);
});







