angular.module("zy.untils.ajaxLoading", []).factory('globalLoading', [
  "$rootScope", "$q", function($rootScope, $q) {
    var activeRequests, ended, started;
    activeRequests = 0;
    started = function() {
      activeRequests++;
      return $rootScope.loading = true;
    };
    ended = function() {
      activeRequests--;
      if (activeRequests === 0) {
        return $rootScope.loading = false;
      }
    };
    return {
      request: function(config) {
        started();
        return config || $q.when(config);
      },
      response: function(response) {
        ended();
        return response || $q.when(response);
      },
      responseError: function(rejection) {
        ended();
        return $q.reject(rejection);
      }
    };
  }
]).config([
  '$httpProvider', function($httpProvider) {
    return $httpProvider.interceptors.push('globalLoading');
  }
]);
