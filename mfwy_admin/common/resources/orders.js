/**
 * Created by Administrator on 2015/11/14 0014.
 */
/**
 * Created by Administrator on 2015/9/14 0014.
 */
angular.module("resource.orders",["ngResource"])
    .factory("Orders",['odataResource',function(odataResource){
        return odataResource(""+config.url.api+"/v1/orders",{
            list:{
                method:"GET",
                params:{
                    //$orderby:"id desc"
                }
            }
        })
    }]);