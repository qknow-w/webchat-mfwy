/**
 * Created by Administrator on 2015/11/15 0015.
 */
define(['app'], function (app) {
    app.factory('weixinService', ['$q','$http','$window', function ($q,$http,$window) {
        getConfig=function(){
            var deferred;
            deferred = $q.defer();
            $http.get(config.url.api+"/JSSDK?para="+$window.location.href.split('#')[0], void 0).success(function(data) {
                return deferred.resolve(data);
            }).error(function(error) {
                return deferred.reject(void 0);
            });
            return deferred.promise;
        };

        return {getConfig:getConfig}
    }
    ]);
});