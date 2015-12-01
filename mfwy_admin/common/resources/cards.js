/**
 * Created by Administrator on 2015/11/29 0029.
 */
angular.module("resource.cards", ["ngResource"])
    .factory("Cards", ['odataResource', function (odataResource) {
        return odataResource("" + config.url.api + "/v1/cards", {
            list: {
                method: "GET",
                params: {
                    //$orderby:"id desc"
                }
            }
        })
    }]);