/**
 * Created by Administrator on 2015/12/15.
 */
angular.module("resource.setting", ["ngResource"]).factory("Setting", [
    'odataResource', function(odataResource) {
        return odataResource("" + config.url.api + "/v1/setting", {
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