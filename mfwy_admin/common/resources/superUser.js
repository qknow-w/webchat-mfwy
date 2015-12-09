/**
 * Created by Administrator on 2015/12/7 0007.
 */
angular.module("resource.superusers", ["ngResource"]).factory("SuperUsers", [
    'odataResource', function(odataResource) {
        return odataResource("" + config.url.api + "/v1/users", {
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