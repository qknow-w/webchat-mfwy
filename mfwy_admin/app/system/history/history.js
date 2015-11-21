angular.module('system-history', []).config([
  "$routeProvider", function($routeProvider) {
    return $routeProvider.when("/system/history", {
      templateUrl: "/app/system/history/history.tpl.html",
      controller: 'SystemHistoryCtrl'
    });
  }
]).controller('SystemHistoryCtrl', [
  "$scope", "$http", 'version', function($scope, $http, version) {
    return version.get().then(function(data) {
      return $scope.versions = data;
    });
  }
]);
