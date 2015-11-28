/**
 * Created by Administrator on 2015/11/19 0019.
 */
/**
 * Created by Administrator on 2015/11/16 0016.
 */

var func = require('node-odata').Function;
var resources = require('node-odata').resources;
var router = func();
var request=require('request');
var xlsx = require('node-xlsx');

//更改为货到付款
router.post("/v1/orders/:no/:openid",function(req,res,next){
    console.log(req.params.no);
    resources.orders.findOne({no: req.params.no,openid:req.params.openid}).exec(function(err,result){
        if(err)  res.status(500).send(err);
        console.log("result",result);
        result.states=1; // 2 货到付款
        result.payInfo.payType = "货到付款";
        result.save(function(err){
            console.log(err);
        });
        res.send('success');
    });
});

//第二次支付 更改订单号
router.post("/v1/orders/secondPay",function(req,res,next){
    resources.orders.findOne({"_id":req.body.id}).exec(function(err,result){
        if(err)  res.status(500).send(err);
        console.log(result);
        no=Date.parse(new Date());
        result.no=no;
        result.save();
        request.post({url:"http://localhost:8000/pay/order",
            form:{"openid":result.openid,"money":result.totalMoney,"no":no}},function(err,httpResponse,body){
            if (err) {
                res.status(500).send(err);
            }
            res.send(body);
        })

    });
});

//确认收货
router.post("/v1/orders/sure",function(req,res,next){
    resources.orders.findOne({"_id":req.body.id}).exec(function(err,result){
        if(err)  res.status(500).send(err);
        result.states=3;
        result.save();
        res.send("success");

    });
});


//删除订单
router.post("/v1/orders/delete",function(req,res,next){
    resources.orders.findOne({"_id":req.body.id}).exec(function(err,result){
        if(err)  res.status(500).send(err);
        result.states=6;
        result.save();
        res.send("success");

    });
});


//发货
router.post("/v1/orders/send",function(req,res,next){
    resources.orders.findOne({"_id":req.body.id}).exec(function(err,result){
        if(err)  res.status(500).send(err);
        result.states=5;
        result.save();
        res.send("success");

    });
});


//mongoose or
router.post("/v1/orders/find",function(req,res,next){
    resources.orders.findOne({"_id":req.body.id}).exec(function(err,result){
        if(err)  res.status(500).send(err);
        result.states=6;
        result.save();
        res.send("success");

    });
});

//mongoose states=3 and 6 pagination 10
router.get("/v1/orders/pagination",function(req,res,next){
    /*console.log(req.query.skip);
    console.log(req.query.top);
    var skip=req.query.skip;
    var top=req.query.top;
    var currentAdd=req.query.currentAdd;
    resources.orders.find({"currentAdd":currentAdd}).find({"states":{"$nin":[3,6]}}).exec(function(err,count){
        if(err)  res.status(500).send(err);
        resources.orders.find({"states":{"$nin":[3,6]},"currentAdd":currentAdd}).skip(skip).limit(top).sort({"states" :"1","createInfo" :"-1"}).exec(function(err,result){
            if(err)  res.status(500).send(err);
            res.send({"@odata.count":count.length,"value":result});
        });
    });
*/
    var skip=req.query.skip;
    var top=req.query.top;
    var currentAdd=req.query.currentAdd;
    var search=req.query.search;
    resources.orders.find().or([{"currentAdd":currentAdd,"states":{"$nin":[3,6]},"no":new RegExp(search, "i")},
        {"currentAdd":currentAdd,"states":{"$nin":[3,6]},"userInfo.name":new RegExp(search, "i")}]).exec(function(err,count){
        if(err)  res.status(500).send(err);
        resources.orders.find().or([{"currentAdd":currentAdd,"states":{"$nin":[3,6]},"no":new RegExp(search, "i")},
            {"currentAdd":currentAdd,"states":{"$nin":[3,6]},"userInfo.name":new RegExp(search, "i")}]).skip(skip).limit(top).sort({"states" :"1","createInfo" :"-1"}).exec(function(err,result){
            if(err)  res.status(500).send(err);
            res.send({"@odata.count":count.length,"value":result});
        });
    });
});




/*//search mongoose states=3 and 6 pagination 10
router.get("/v1/orders/search",function(req,res,next){
    var skip=req.query.skip;
    var top=req.query.top;
    var currentAdd=req.query.currentAdd;
    var search=req.query.search;
    resources.orders.find().or([{"currentAdd":currentAdd,"states":{"$nin":[3,6]},"no":new RegExp(search, "i")},
        {"currentAdd":currentAdd,"states":{"$nin":[3,6]},"userInfo.name":new RegExp(search, "i")}]).exec(function(err,count){
        if(err)  res.status(500).send(err);
        resources.orders.find().or([{"currentAdd":currentAdd,"states":{"$nin":[3,6]},"no":new RegExp(search, "i")},
            {"currentAdd":currentAdd,"states":{"$nin":[3,6]},"userInfo.name":new RegExp(search, "i")}]).skip(skip).limit(top).sort({"states" :"1","createInfo" :"-1"}).exec(function(err,result){
            if(err)  res.status(500).send(err);
            res.send({"@odata.count":count.length,"value":result});
        });
    });


/!*    resources.orders.find({"no":new RegExp(name, "i")}).sort({"states" :"1","createInfo" :"-1"}).exec(function(err,result){
        if(err)  res.status(500).send(err);
        console.log(result);
        res.send(result);
    });*!/


});*/
//order import all excel
router.get("/v1/orders/excel/all",function(req,res,next){
    var currentAdd=req.query.currentAdd;
    var search=req.query.search;
    resources.orders.find().or([{"currentAdd":currentAdd,"states":{"$nin":[3,6]},"no":new RegExp(search, "i")},
        {"currentAdd":currentAdd,"states":{"$nin":[3,6]},"userInfo.name":new RegExp(search, "i")}]).sort({"states" :"1","createInfo" :"-1"}).exec(function(err,result){
        if(err)  res.status(500).send(err);
        var data =[];
        data.push(["订单号","名片类型","名片工艺","支付类型","姓名","地址","电话","数量","总金额"]);
        for(var i=0;i<result.length;i++){
            data.push([result[i].no,result[i].card.c_type,result[i].card.gongyi,result[i].payInfo.payType,result[i].userInfo.name,
                result[i].userInfo.address,result[i].userInfo.phone,result[i].num,result[i].totalMoney])
        }
        var buffer = xlsx.build([{name: "订单excel", data: data}]); // returns a buffer
       // res.setHeader("Content-Disposition", "attachment;filename=" + new Date().toLocaleString()+".xlsx");

        //filename
        var myDate=new Date();
        var filename= myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate();
        res.setHeader("Content-Disposition",  "attachment;filename=\"" +filename + "\".xlsx");
        res.send(buffer);
    });
});






module.exports = router;