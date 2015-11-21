angular.module("zy.untils.promissLoading", []).config(function($provide) {
  return $provide.decorator("$q", [
    "$delegate", "$rootScope", function($delegate, $rootScope) {
      var $q, origDefer, pendingPromisses;
      pendingPromisses = 0;
      $rootScope.$watch(function() {
        return pendingPromisses > 0;
      }, function(loading) {
        return $rootScope.loading = loading;
      });
      $q = $delegate;
      origDefer = $q.defer;
      $q.defer = function() {
        var defer;
        defer = origDefer();
        pendingPromisses++;
        defer.promise["finally"](function() {
          return pendingPromisses--;
        });
        return defer;
      };
      return $q;
    }
  ]);
});
