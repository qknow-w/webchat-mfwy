angular.module("framework.controllers.main", []).controller('MainCtrl', [
  "$scope", "$rootScope", "$http", "$location", "version", "context", "$localStorage", 'ngDialog', function($scope, $rootScope, $http, $location, version, context, $localStorage, ngDialog) {
    $scope.$on("loginSuccessed", function() {
      version.get().then(function(data) {
        var dialog;
        if (!data.length) {
          return;
        }
        $scope.newVersion = data[0];
        if ($scope.newVersion.ver !== $localStorage.ver) {
          dialog = ngDialog.open({
            template: '/app/dialogs/version-upgrade/version-upgrade-dialog.tpl.html',
            controller: 'VersionUpgradeDialogCtrl',
            scope: $scope
          });
          return dialog.closePromise.then(function() {
            return $localStorage.ver = $scope.newVersion.ver;
          });
        }
      });
      $rootScope.account = context.account;
      $rootScope.__login = true;
      $rootScope.__logoff = false;
      $location.path($scope.__returnUrl || '/').replace();
      return $scope.__returnUrl = null;
    });
    return $scope.$on("logoutSuccessed", function() {
      $rootScope.__login = false;
      return $rootScope.__logoff = true;
    });
  }
]);
