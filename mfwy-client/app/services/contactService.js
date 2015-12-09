/**
 * Created by Administrator on 2015/11/16 0016.
 */

define(['app'], function (app) {
    app.factory('contactService', ['$q','$http', function ($q,$http) {

        list=function(currentAdd){
            var deferred;
            deferred = $q.defer();
            $http.get(config.url.api+"/v1/connections?$filter=currentAdd eq '"+currentAdd+"'", void 0).success(function(data) {
                return deferred.resolve(data.value);
            }).error(function(error) {
                console.log(error);
                return deferred.reject(void 0);
            });
            return deferred.promise;
        };

        return {list:list

        }
    }]);
});