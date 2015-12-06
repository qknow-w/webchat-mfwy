/**
 * Created by Administrator on 2015/12/6 0006.
 */
angular.module("resource.adv",["ngResource"])
    .factory("Adv",['odataResource',function(odataResource){
        return odataResource(""+config.url.api+"/v1/adv",{
            list:{
                method:"GET",
                params:{
                    //$orderby:"id desc"
                }
            }
        })
    }]);