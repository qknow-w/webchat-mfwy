/**
 * Created by Administrator on 2015/11/8 0008.
 */
define(['app'], function (app) {
    app.factory('templateService', ['$q', '$http', function ($q, $http) {

        tpl = function (addNo,pageNo) {
            var deferred;
            deferred = $q.defer();
            $http.get(config.url.api + "/v1/templates?$filter=type eq 0 and currentAdd eq '" + addNo + "'&$skip="+
                (pageNo - 1) * 10+"&$top=10&$orderby=num desc", void 0).success(function (data) {

                return deferred.resolve(data.value);

            }).error(function (error) {
                console.log(error);
                return deferred.reject(void 0);
            });
            return deferred.promise;
        };





        return {
            tpl: tpl
        }
    }]);
});