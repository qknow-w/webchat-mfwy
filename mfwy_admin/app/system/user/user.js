angular.module('system-user', ['resource.users', 'user-edit']).config([
  '$routeProvider', function($routeProvider) {
    return $routeProvider.when('/system/user', {
      templateUrl: '/app/system/user/user.tpl.html',
      controller: 'SystemUserCtrl',
      resolve: {
        users: [
          "$q", "Users", function($q, Users) {
            var deferred;
            deferred = $q.defer();
            Users.list(function(data) {
              return deferred.resolve(data.value);
            });
            return deferred.promise;
          }
        ]
      }
    });
  }
]).controller('SystemUserCtrl', [
  '$scope', 'users', 'Users', 'ngDialog', function($scope, users, Users, ngDialog) {
    var load, openDialog;
    $scope.list = users;
    load = function() {
      return Users.list(function(data) {
        return $scope.list = data.value;
      });
    };
    $scope.openAddDialog = function() {
      $scope.entity = {};
      return openDialog();
    };
    $scope.openEditDialog = function(item) {
      $scope.entity = item;
      return openDialog();
    };
    return openDialog = function() {
      var dialog;
      dialog = ngDialog.open({
        template: '/app/system/user/user-edit-dialog.tpl.html',
        controller: 'UserEditDialogCtrl',
        scope: $scope
      });
      return dialog.closePromise.then(load);
    };
  }
]);
