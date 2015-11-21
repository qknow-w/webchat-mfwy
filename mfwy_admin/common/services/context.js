angular.module("zy.services.context", []).factory("context", [
  '$http', '$localStorage', function($http, $localStorage) {
    var obj, _account;
    _account = void 0;
    obj = {};
    Object.defineProperty(obj, "account", {
      get: function() {
        return _account || $localStorage.account || {
          name: void 0,
          email: void 0,
          avatar: '/img/avatar.png'
        };
      },
      set: function(val) {
        _account = val;
        return $localStorage.account = val;
      }
    });
    obj.auth = {
      admin: false
    };
    return obj;
  }
]);
