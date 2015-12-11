/**
 * Created by Administrator on 2015/12/11 0011.
 */
angular.module("resource.logs", ["ngResource"]).factory("Logs", [
    'odataResource', function(odataResource) {
        return odataResource("" + config.url.api + "/v1/logs", {
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