angular.module("zy.directives.datepicker", []).directive("zyDatepicker", function() {
  return {
    restrict: "A",
    require: "ngModel",
    link: function(scope, element, attrs, ngModelCtrl) {
      var options;
      element.attr({
        "readonly": "readonly"
      });
      element.css("cursor", "pointer");
      element.css("background", "#FFF");
      options = {};
      if (attrs.negDatePicker) {
        options = $.parseJSON(attrs.negDatePicker);
      }
      return element.datepicker({
        changeMonth: options.changeMonth || false,
        changeYear: options.changeYear || false,
        dateFormat: options.dateFormat || "mm/dd/yy",
        showAnim: "drop",
        onSelect: function(date) {
          ngModelCtrl.$setViewValue(date);
          return scope.$apply();
        }
      });
    }
  };
});
