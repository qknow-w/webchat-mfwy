angular.module('system-401', ['ngRoute']).config([
  "$routeProvider", function($routeProvider) {
    return $routeProvider.when("/401", {
      templateUrl: "/app/system/401/index.tpl.html",
      controller: function() {}
    });
  }
]);
