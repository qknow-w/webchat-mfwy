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
            $http.get(config.url.api+"/v1/orders?$filter=states ne 6 and openid eq '"+openid+"'&$orderby=createInfo desc", void 0).success(function(data) {
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
        //等待发货
        waitDelivery=function(openid){
            var deferred;
            deferred = $q.defer();
            $http.get(config.url.api+"/v1/orders?$filter=states eq 1  and openid eq '"+openid+"'&$orderby=createInfo desc", void 0).success(function(data) {
                /*createOrder(data.value[0].c_type, data.value[0].gongyi);*/
                console.log(data.value);
                return deferred.resolve(data.value);
            }).error(function(error) {
                console.log(error);
                return deferred.reject(void 0);
            });
            return deferred.promise;
        };
        //待收货
        takeDelivery =function(openid){
            var deferred;
            deferred = $q.defer();
            $http.get(config.url.api+"/v1/orders?$filter=states eq 5 and openid eq '"+openid+"'&$orderby=createInfo desc", void 0).success(function(data) {
                console.log("data", data.value[0]);
                /*createOrder(data.value[0].c_type, data.value[0].gongyi);*/
                return deferred.resolve(data.value);
            }).error(function(error) {
                console.log(error);
                return deferred.reject(void 0);
            });
            return deferred.promise;
        };
        //确认收获
        confirm=function(id){
            var deferred;
            deferred = $q.defer();
            $http.post(config.url.api+"/v1/orders/sure", {"id":id}).success(function(data) {
                return deferred.resolve(data);
            }).error(function(error) {
                return deferred.reject(void 0);
            });
            return deferred.promise;
        };
        //删除订单
        deleteOrder=function(id){
            var deferred;
            deferred = $q.defer();
            $http.post(config.url.api+"/v1/orders/delete", {"id":id}).success(function(data) {
                return deferred.resolve(data);
            }).error(function(error) {
                return deferred.reject(void 0);
            });
            return deferred.promise;
        };
        //完全删除订单
        deleteOrder=function(id){
            var deferred;
            deferred = $q.defer();
            $http.delete(config.url.api+"/v1/orders("+id+")").success(function(data) {
                return deferred.resolve(data);
            }).error(function(error) {
                return deferred.reject(void 0);
            });
            return deferred.promise;
        };

        //订单详情
        detailedOrder=function(id){
            var deferred;
            deferred = $q.defer();
            $http.get(config.url.api+"/v1/orders("+id+")").success(function(data) {
                return deferred.resolve(data);
            }).error(function(error) {
                return deferred.reject(void 0);
            });
            return deferred.promise;
        };
        return {list:list,
            notPay:notPay,
            waitDelivery:waitDelivery,
            takeDelivery:takeDelivery,
            confirm:confirm,
            deleteOrder:deleteOrder,
            deleteOrderr:deleteOrderr,
            detailedOrder:detailedOrder
        }
    }]);
});







