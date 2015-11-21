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


//更改为货到付款
router.post("/v1/orders/:no/:openid",function(req,res,next){
    console.log(req.params.no);
    resources.orders.findOne({no: req.params.no,openid:req.params.openid}).exec(function(err,result){
        if(err)  res.send(err);
        console.log("result",result);
        result.states=2; // 2 货到付款
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
        if(err)  res.send(err);
        console.log(result);
        no=Date.parse(new Date());
        result.no=no;
        result.save();
        request.post({url:"http://localhost:8000/pay/order",
            form:{"openid":result.openid,"money":result.totalMoney,"no":no}},function(err,httpResponse,body){
            if (err) {
                res.send(err);
            }
            res.send(body);
        })




    });
});



module.exports = router;