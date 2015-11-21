angular.module("zy.untils.ajaxErrorHandler", []).factory('ajaxErrorHandler', [
  "$rootScope", "$q", "messager", function($rootScope, $q, messager) {
    var error, success;
    success = function(response) {
      return response;
    };
    error = function(response) {
      messager.error(response.data);
      status.cancel();
      return $q.reject(response);
    };
    return function(promise) {
      return promise.then(success, error);
    };
  }
]).config([
  '$httpProvider', '$provide', function($httpProvider, $provide) {
    return $httpProvider.interceptors.push('ajaxErrorHandler');
  }
]);
