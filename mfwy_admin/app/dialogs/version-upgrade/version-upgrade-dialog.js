angular.module('version-upgrade-dialog', []).controller('VersionUpgradeDialogCtrl', [
  "$scope", '$location', function($scope, $location) {
    $scope.more = function() {
      $location.path('/system/history');
      return $scope.close();
    };
    return $scope.close = function() {
      return $scope.closeThisDialog();
    };
  }
]);
