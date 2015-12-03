/**
 * Created by Administrator on 2015/11/8 0008.
 */
define(['app'], function (app) {
    app.factory('customService', ['$q','$http', function ($q,$http) {

        custom=function(addNo){
            var deferred;
            deferred = $q.defer();
            $http.get(config.url.api+"/v1/templates?$filter=type eq 1 and currentAdd eq '"+addNo+"'", void 0).success(function(data) {

                return deferred.resolve(data.value);

            }).error(function(error) {
                console.log(error);
                return deferred.reject(void 0);
            });
            return deferred.promise;
        };
        return {
            custom:custom
        }
    }]);
});