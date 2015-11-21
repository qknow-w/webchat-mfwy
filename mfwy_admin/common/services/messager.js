angular.module("zy.services.messager", []).factory("messager", function() {
  Messenger.options = {
    extraClasses: 'messenger-fixed messenger-on-top',
    theme: 'flat'
  };
  return {
    success: function(msg) {
      return Messenger().post({
        message: msg,
        type: 'success',
        showCloseButton: true
      });
    },
    error: function(msg) {
      if (msg === '401') {
        msg = 'Unauthorized.';
      }
      return Messenger().post({
        message: msg,
        type: 'error',
        showCloseButton: true,
        delay: 600
      });
    },
    confirm: function(callback, msg) {
      Messenger.options = {
        extraClasses: 'messenger-fixed messenger-on-top',
        theme: 'flat'
      };
      return msg = Messenger().post({
        message: msg || "Do you want to continue?",
        id: "Only-one-message",
        showCloseButton: true,
        actions: {
          OK: {
            label: "OK",
            phrase: "Confirm",
            delay: 60,
            action: function() {
              callback();
              return msg.cancel();
            }
          },
          cancel: {
            action: function() {
              return msg.cancel();
            }
          }
        }
      });
    }
  };
});
