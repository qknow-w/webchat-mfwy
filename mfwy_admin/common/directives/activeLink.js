angular.module("zy.directives.activeLink", []).directive("activeLink", [
  "$location", function(location) {
    return {
      restrict: "A",
      link: function(scope, element, attrs) {
        var className, link, match, path;
        className = attrs.activeLink;
        link = $(element).children("a")[0];
        path = $(link).attr('href');
        scope.location = location;
        scope.$watch("location.path()", function(currentPath) {
          if (match(path, currentPath)) {
            return element.addClass(className);
          } else {
            return element.removeClass(className);
          }
        });
        return match = function(path, currentPath) {
          if (path === '/') {
            return currentPath === '/';
          } else {
            return currentPath.indexOf(path) === 0;
          }
        };
      }
    };
  }
]).directive("activeParentLink", [
  "$location", function(location) {
    return {
      restrict: "A",
      link: function(scope, element, attrs) {
        var className, item, links, match, paths, _i, _len;
        className = attrs.activeParentLink;
        links = $(element).children("ul").children("li").children("a");
        paths = [];
        for (_i = 0, _len = links.length; _i < _len; _i++) {
          item = links[_i];
          paths.push($(item).attr('href'));
        }
        scope.location = location;
        scope.$watch("location.path()", function(currentPath) {
          var path, _j, _len1, _results;
          element.removeClass(className);
          _results = [];
          for (_j = 0, _len1 = paths.length; _j < _len1; _j++) {
            path = paths[_j];
            if (match(path, currentPath)) {
              _results.push(element.addClass(className));
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        });
        return match = function(path, currentPath) {
          if (path === '/') {
            return currentPath === '/';
          } else {
            return currentPath.indexOf(path) === 0;
          }
        };
      }
    };
  }
]);
