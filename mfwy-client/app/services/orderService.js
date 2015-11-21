/**
 * Created by Administrator on 2015/11/8 0008.
 */
define(['app'], function (app) {
    app.factory('orderService', ['$q','$http', function ($q,$http) {

        list=function(){
            var deferred;
            deferred = $q.defer();
            $http.get(config.url.api+"/v1/cards", void 0).success(function(data) {
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
                return deferred.resolve(data.value);
            }).error(function(error){
                return deferred.reject(void 0);
            });
            return deferred.promise;
        };
        wechatConfig=function(postdata){
            var deferred;
            deferred = $q.defer();
            $http.post(config.url.api+"/pay/order", postdata).success(function(data) {
                return deferred.resolve(data);
            }).error(function(error) {
                return deferred.reject(void 0);
            });
            return deferred.promise;
        };
        //更改状态为货到付款
        deliveryPay=function(no,openid){
            var deferred;
            deferred = $q.defer();
            $http.post(config.url.api+"/v1/orders/"+no+"/"+openid).success(function(data) {
                /*createOrder(data.value[0].c_type, data.value[0].gongyi);*/
                return deferred.resolve(data.value);
            }).error(function(error) {
                console.log(error);
                return deferred.reject(void 0);
            });
            return deferred.promise;
        };
        //第二次支付  更新订单号
        secondPay=function(postdata){
            var deferred;
            deferred = $q.defer();
            $http.post(config.url.api+"/v1/orders/secondPay", postdata).success(function(data) {
                return deferred.resolve(data);
            }).error(function(error) {
                return deferred.reject(void 0);
            });
            return deferred.promise;
        };

        return {list:list,
            order:order,
            getWechatConfig:wechatConfig,
            deliveryPay:deliveryPay,
            secondPay:secondPay

        }
    }]);
});