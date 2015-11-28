angular.module("zy.services.security", ['resource.users', 'ipCookie']).factory("security", [
  'Users', '$q', "$http", "ipCookie", function(Users, $q, $http, ipCookie) {
    return {
      autoLogin: function() {
        var deferred, token;
        deferred = $q.defer();
        token = ipCookie('authorization');
        currentAdd= ipCookie('currentAdd');
        if (token) {
          $http.defaults.headers.common['authorization'] = token;
          $http.defaults.headers.common['currentAdd'] = currentAdd;
          $http.post("" + config.url.api + "/v1/auto-login", void 0).success(function(data) {
            return deferred.resolve(data);
          }).error(function(error) {
            ipCookie.remove('authorization', {
              path: '/'
            });
            ipCookie.remove('currentAdd');
            return deferred.reject(void 0);
          });
        } else {
          deferred.reject(void 0);
        }
        return deferred.promise;
      },
      login: function(user) {
        var deferred;
        deferred = $q.defer();
        $http.post("" + config.url.api + "/v1/login", {
          name: user.name,
          password: user.password
        }).success(function(data, status, headers) {
          var params, token;
          token = headers('authorization');
          currentAdd=headers('currentAdd');
          $http.defaults.headers.common['authorization'] = token;
          $http.defaults.headers.common['currentAdd'] = currentAdd;
          params = {
            path: '/',
            domain: config.host.domain
          };
          if (config.host.domain === 'localhost') {
            params.domain = '';
          }
          if (user.remember) {
            params.expires = 180;
          }
          ipCookie('authorization', token, params);
          ipCookie('currentAdd', currentAdd, params );
          return deferred.resolve(data);
        }).error(function(error) {
          return deferred.reject(void 0);
        });
        return deferred.promise;
      },
      logoff: function() {
        var deferred;
        deferred = $q.defer();
        $http.post("" + config.url.api + "/v1/logoff", void 0).success(function(data) {
          ipCookie.remove('authorization', {
            path: '/'
          });
          ipCookie.remove('currentAdd');
          delete $http.defaults.headers.common['authorization'];
          delete $http.defaults.headers.common['currentAdd'];
          return deferred.resolve("OK");
        }).error(function(err){

        });
        return deferred.promise;
      }
    };
  }
]);
