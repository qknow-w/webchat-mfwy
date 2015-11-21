/**
 * Created by Administrator on 2015/11/15 0015.
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