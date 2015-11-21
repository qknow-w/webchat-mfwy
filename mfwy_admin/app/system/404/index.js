angular.module('system-404', ['ngRoute']).config([
  "$routeProvider", function($routeProvider) {
    return $routeProvider.when("/404", {
      templateUrl: "/app/system/404/index.tpl.html",
      controller: function() {}
    });
  }
]);
