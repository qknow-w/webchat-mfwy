angular.module("framework.controllers.login", ['ngRoute']).config([
  "$routeProvider", function($routeProvider) {
    return $routeProvider.when("/login", {
      template: "",
      controller: function() {}
    });
  }
]).controller('LoginCtrl', [
  "$scope", "$rootScope", "security", "context", 'ipCookie',function($scope, $rootScope, security, context,ipCookie) {
    $scope.login = function() {
      $scope.error = '';
      return security.login($scope.user).then(function(data) {

        $rootScope.currentAdd=ipCookie('currentAdd');
        console.log($rootScope.currentAdd);
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
        $rootScope.currentAdd="";
        return $rootScope.$broadcast("logoutSuccessed");
      });
    };
  }
]);
