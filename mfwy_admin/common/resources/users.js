angular.module("resource.users", ["ngResource"]).factory("Users", [
  'odataResource', function(odataResource) {
    return odataResource("" + config.url.api + "/user", {
      autoSignin: {
        method: "POST",
        params: {
          action: 'auto-login'
        }
      },
      signin: {
        method: "POST",
        params: {
          action: 'login'
        }
      },
      signout: {
        method: "POST",
        params: {
          action: 'logout'
        }
      }
    });
  }
]);
