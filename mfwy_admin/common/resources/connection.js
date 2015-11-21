/**
 * Created by Administrator on 2015/11/15 0015.
 */
angular.module("resource.connections",["ngResource"])
    .factory("Connections",['odataResource',function(odataResource){
        return odataResource(""+config.url.api+"/v1/connections",{
            list:{
                method:"GET",
                params:{
                    //$orderby:"id desc"
                }
            }
        })
    }]);