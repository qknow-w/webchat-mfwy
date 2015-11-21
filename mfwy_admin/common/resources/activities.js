/**
 * Created by Administrator on 2015/9/14 0014.
 */
angular.module("resource.activities",["ngResource"])
    .factory("Activities",['odataResource',function(odataResource){
        return odataResource(""+config.url.api+"/v1/activities",{
            list:{
                method:"GET",
                params:{
                    //$orderby:"id desc"
                }
            }
        })
    }]);