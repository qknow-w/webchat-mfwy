/**
 * Created by Administrator on 2015/9/24 0024.
 */
angular.module("resource.pictures",["ngResource"])
    .factory("Pictures",['odataResource',function(odataResource){
        return odataResource(""+config.url.api+"/v1/families",{
            list:{
                method:"GET",
                params:{
                    //$orderby:"id desc"
                }
            }
        })
    }]);