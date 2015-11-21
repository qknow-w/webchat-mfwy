angular.module("framework.controllers.login", ['ngRoute']).config([
  "$routeProvider", function($routeProvider) {
    return $routeProvider.when("/login", {
      template: "",
      controller: function() {}
    });
  }
]).controller('LoginCtrl', [
  "$scope", "$rootScope", "security", "context", function($scope, $rootScope, security, context) {
    $scope.login = function() {
      $scope.error = '';
      return security.login($scope.user).then(function(data) {
        context.account = data;
        context.auth.admin = true;
        return $rootScope.$broadcast("loginSuccessed");
      }, function() {
        $scope.user.Password = '';
        return $scope.error = "Username or password wrong.";
      });
    };
    return $scope.logout = function() {
      context.auth.admin = false;
      return security.logoff().then(function() {
        return $rootScope.$broadcast("logoutSuccessed");
      });
    };
  }
]);
