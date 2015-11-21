angular.module("zy.services.tip", []).provider("tip", function() {
  this.$get = [
    "$document", "$window", "$compile", "$rootScope", function($document, $window, $compile, $rootScope) {
      var $scope;
      $scope = $rootScope;
      return {
        show: function(tip) {
          return $scope.loadingTip = (tip || "Loading") + "...";
        },
        hide: function() {
          return $scope.loadingTip = "";
        },
        status: function() {
          return !!$scope.loadingTip;
        }
      };
    }
  ];
});
