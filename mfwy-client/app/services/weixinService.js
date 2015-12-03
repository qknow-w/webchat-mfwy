/**
 * Created by Administrator on 2015/11/15 0015.
 */
define(['app'], function (app) {
    app.factory('weixinService', ['$q','$http','$window','ipCookie', function ($q,$http,$window,ipCookie) {
        getConfig=function(){
            var deferred;
            deferred = $q.defer();
            //alert(config.url.api+"/JSSDK?para="+$window.location.href.split('#')[0]);
            //alert(config.url.api+"/JSSDK?para=http://17quay.cn/openid?="+ipCookie('openid'));
            //config.url.api+"/JSSDK?para="+encodeURIComponent($window.location.href.split('#')[0]
            $http.get(config.url.api+"/JSSDK?para=http://qknow.com.cn/?openid="+ipCookie('openid'), void 0).success(function(data) {
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