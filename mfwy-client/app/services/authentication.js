 angular.module(auth_name).factory(auth_services_authentication, [
     '$q', '$http', 'ipCookie',
     function($q, $http, ipCookie) {
         var currentUser;
         createUser = function(name, permissions, router) {
             return {
                 name: name,
                 permissions: permissions,
                 router: router
             };
         };
         autoLogin = function() {
             var deferred, token;
             deferred = $q.defer();
             token = ipCookie('authorization');
             console.log("token", token);
             if (token) {
                 $http.defaults.headers.common['authorization'] = token;
                 $http.post("http://localhost:40002/v1/auto-login", void 0).success(function(data) {
                     console.log("data", data);
                     currentUser = createUser(data.account, data.permission, data.router);
                     console.log(currentUser);
                     return deferred.resolve(currentUser);
                 }).error(function(error) {
                     ipCookie.remove('authorization', {
                         path: '/'
                     });

                     return deferred.reject(void 0);
                 });
             } else {
                 deferred.reject(void 0);
             }
             return deferred.promise;
         };
         login = function(user) {
             console.log(user);
             var deferred;
             deferred = $q.defer();
             $http.post("http://localhost:40002/v1/login", {
                 account: user.account,
                 password: user.password
             }).success(function(data, status, headers) {
                 console.log("login", data);
                 var params, token;
                 token = headers('authorization');
                 $http.defaults.headers.common['authorization'] = token;
                 params = {
                     path: '/',
                     domain: ""
                 };
                 /* if (config.host.domain === 'localhost') {
                      params.domain = '';
                  }*/
                 if (user.remember) {
                     params.expires = 180;
                 }
                 ipCookie('authorization', token, params);
                 currentUser = createUser(data.account, data.permission, data.router);
                 return deferred.resolve(currentUser);
             }).error(function(error) {
                 return deferred.reject(void 0);
             });
             return deferred.promise;
         };
         logout = function() {
             var deferred;
             deferred = $q.defer();
             $http.post("http://localhost:40002/v1/logout", void 0).success(function(data) {
                 ipCookie.remove('authorization', {
                     path: '/'
                 });
                 delete $http.defaults.headers.common['authorization'];
                 currentUser
                     = undefined;
                 return deferred.resolve("OK");
             });
             return deferred.promise;
         };
         getCurrentLoginUser = function() {
             return currentUser;
         };
         DeleteCurrentLoginUser = function(value) {
             ipCookie.remove('authorization', {
                 path: '/'
             });
             delete $http.defaults.headers.common['authorization'];
             return currentUser = undefined;
         };

         return {
             autoLogin: autoLogin,
             login: login,
             logout: logout,
             getCurrentLoginUser: getCurrentLoginUser,
             DeleteCurrentLoginUser: DeleteCurrentLoginUser
         };
     }
 ]);
