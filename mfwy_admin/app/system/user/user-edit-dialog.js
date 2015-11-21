1;
angular.module('user-edit', []).controller('UserEditDialogCtrl', [
  '$scope', 'Users', 'messager', 'tip', function($scope, Users, messager, tip) {
    $scope.entity = angular.copy($scope.$parent.entity);
    $scope.save = function() {
      tip.show("Saving");
      if ($scope.entity.id) {
        return Users.put({
          id: $scope.entity.id
        }, $scope.entity, function(data) {
          messager.success("Edit user successfully.");
          return $scope.closeThisDialog();
        });
      } else {
        return Users.post($scope.entity, function(data) {
          messager.success("Add user successfully.");
          return $scope.closeThisDialog();
        });
      }
    };
    return $scope.close = function() {
      return $scope.closeThisDialog();
    };
  }
]);
