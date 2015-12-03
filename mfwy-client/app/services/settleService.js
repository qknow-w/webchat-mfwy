/**
 * Created by Administrator on 2015/11/8 0008.
 */
define(['app'], function (app) {
    app.factory('settleService', ['$q', '$http', function ($q, $http) {
        //添加名片安家
        addFamily=function(data){
            var deferred;
            deferred = $q.defer();
            $http.post(config.url.api+"/v1/families", data).success(function(data) {
                return deferred.resolve(data.value);
            }).error(function(error) {
                console.log(error);
                return deferred.reject(void 0);
            });
            return deferred.promise;
        };

        //查看名片
        seeCard=function(openid){
            var deferred;
            deferred = $q.defer();
            $http.get(config.url.api+"/v1/families?$filter=openid eq '"+openid+"'",void 0).success(function(data) {
                return deferred.resolve(data.value);
            }).error(function(error) {
                console.log(error);
                return deferred.reject(void 0);
            });
            return deferred.promise;
        };



        return {
            addFamily:addFamily,
            seeCard:seeCard
        }
    }]);
});