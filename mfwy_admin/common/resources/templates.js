/**
 * Created by Administrator on 2015/11/14 0014.
 */
angular.module("resource.templates",["ngResource"])
    .factory("Templates",['odataResource',function(odataResource){
        return odataResource(""+config.url.api+"/v1/templates",{
            list:{
                method:"GET",
                params:{
                    //$orderby:"id desc"
                }
            }
        })
    }]);