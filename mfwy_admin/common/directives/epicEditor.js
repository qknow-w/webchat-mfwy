angular.module("zy.directives.epicEditor", []).directive('epicEditor', function() {
  return {
    require: "ngModel",
    replace: true,
    template: "<div class=\"epic-editor\"></div>",
    scope: {
      md: '='
    },
    link: function(scope, element, attrs, ngModel) {
      var editor, opts;
      new EpicEditor().remove('article');
      opts = {
        container: element.get(0),
        file: {
          name: 'article',
          defaultContent: scope.md,
          autoSave: false
        },
        autogrow: {
          minHeight: 300,
          maxHeight: 300
        },
        theme: {
          base: '/../../plugin/EpicEditor-v0.2.2/themes/base/epiceditor.css',
          preview: '/../../plugin/EpicEditor-v0.2.2/themes/preview/epic-light.css',
          editor: '/../../plugin/EpicEditor-v0.2.2/themes/editor/github.css'
        }
      };
      editor = new EpicEditor(opts);
      return editor.load(function() {
        var content, epicEditor;
        epicEditor = editor.getElement("editor");
        content = epicEditor.body.innerHTML;
        return $("body", epicEditor).blur(function() {
          var currentContent;
          currentContent = $(this).html();
          if (content !== currentContent) {
            content = currentContent;
            editor.save();
            return scope.$apply(function() {
              var htmlContent;
              scope.md = editor.exportFile();
              htmlContent = editor.exportFile(void 0, 'html');
              return ngModel.$setViewValue(htmlContent);
            });
          }
        });
      });
    }
  };
});
