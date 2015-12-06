/**
 * Created by Administrator on 2015/11/16 0016.
 */
var fs = require('fs');
var Payment = require('wechat-pay').Payment;
var middleware = require('wechat-pay').middleware;
var func = require('node-odata').Function;
var resources = require('node-odata').resources;
var router = func();
var initConfig = {
    partnerKey: "e10adc3849ba56abbe56e056f20f883e",
    appId: "wx585f9f7907d878e8",
    mchId: "1246872701",
    notifyUrl: "http://17quay.cn/pay/payback",
    pfx: fs.readFileSync("./config/cert/apiclient_cert.p12")
};

var payment = new Payment(initConfig);
//支付参数
router.post('/pay/order', function (req, res, next) {
    console.log(req.body.openid);
    var order = {
        body: '蜜蜂网印',
        attach: '蜜蜂网印',
        out_trade_no:req.body.no,//订单号
        total_fee: 1,
       /* total_fee: parseInt(req.body.money)*100,*/
        spbill_create_ip: "115.28.6.179",
        openid: req.body.openid,
        orderid:req.body.orderid,//id
        //openid:req.body.openid,
        trade_type: 'JSAPI'
    };
    payment.getBrandWCPayRequestParams(order, function (err, payargs) {
        if(err)  res.send(err);
        res.send(payargs);
    });
});

//支付回调
router.post('/pay/payback', middleware(initConfig).getNotify().done(function(message, req, res, next) {
    var openid = message.openid;
    console.log(openid);
    var order_id = message.out_trade_no;
    console.log("order_id",order_id);
   // var attach = {};
    resources.orders.findOne({"_id":message.orderid}).exec(function(err,result){
        if(err) console.log(err);  res.reply(err);
        console.log("result",result);
        result.states=1;
        result.payInfo.payType = "微信支付";
        result.save(function(err){
            console.log(err);
        });
        res.reply('success');
    });




    /**
     * 查询订单，在自己系统里把订单标为已处理
     * 如果订单之前已经处理过了直接返回成功
     */
   // res.reply('success');

    /**
     * 有错误返回错误，不然微信会在一段时间里以一定频次请求你
     * res.reply(new Error('...'))
     */
}));

module.exports = router;