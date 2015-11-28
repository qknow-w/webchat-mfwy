/**
 * Created by Administrator on 2015/10/17 0017.
 */
var resources=require('node-odata').resources;
var initData=function(model,path){
    return require(path).forEach(function(item){
        console.log(item);
        var data=new model(item);
        console.log("data",data);
        data.save(function(err){
            console.log(err);
        });
        return console.log("data init: " + path + " import successful.");
    });
};


module.exports={
    "import":function(){
        return resources.users.find().exec(function(err,users){
           // initData(resources.families, "./family/family.json");
           // initData(resources.orders, "./order/order.json");
            //initData(resources.templates, "./template/template.json");
            //initData(resources.cards, "./card/card.json");
           // initData(resources.users, "./system/user.json");
         /* for(var i=0;i<100;i++){
                initData(resources.orders, "./order/order.json");
            }*/
            if(!users.length){

                return initData(resources.users, "./system/user.json");

            }
        })
    }
};