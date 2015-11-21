angular.module("zy.directives.odataPager", []).directive("zyOdataPager", [
  '$compile', function($compile) {
    return {
      link: function(scope, element, attrs) {
        var data, update;
        data = void 0;
        update = function() {
          if (scope.currentPage === void 0) {
            scope.currentPage = 1;
          }
          if (scope.numData !== data['@odata.count'] && scope.numData) {
            scope.currentPage = 1;
          }
          scope.numData = data['@odata.count'];
          scope.numPages = Math.ceil(scope.numData / 10);
          scope.totalItems = scope.numData;
          element[0].innerHTML = '<pagination on-select-page="setPage(page)" total-items="totalItems" page="currentPage" max-size="10" boundary-links="true" rotate="false"></pagination>';
          if (scope.currentPage < scope.numPages) {
            element[0].innerHTML += '<div>{{(currentPage-1)*10+1}} - {{currentPage*10}} of {{numData}}</div>';
          } else {
            element[0].innerHTML += '<div>{{(currentPage-1)*10+1}} - {{numData}} of {{numData}}</div>';
          }
          if (scope.numData === '0') {
            element[0].innerHTML = '';
          }
          return $compile(element.contents())(scope);
        };
        return scope.$watch(attrs.zyOdataPager, function(value) {
          data = value;
          if (data === null || data === void 0) {
            return;
          }
          return update();
        });
      }
    };
  }
]);
