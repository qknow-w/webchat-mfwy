angular.module("zy.directives.ngBindHtmlUnsafe", []).directive("ngBindHtmlUnsafe", [
  function() {
    return function(scope, element, attr) {
      element.addClass("ng-binding").data("$binding", attr.ngBindHtmlUnsafe);
      return scope.$watch(attr.ngBindHtmlUnsafe, function(value) {
        return element.html(value || "");
      });
    };
  }
]);
