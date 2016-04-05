/**
 * Created by Administrator on 2015/9/13 0013.
 */
var wechat = require('wechat'),
    OAuth = require('wechat-oauth'),
    WechatAPI = require('wechat-api'),
    func = require('node-odata').Function,
    resources = require('node-odata').resources,
    request = require("request"),
    fs = require('fs'),
    crypto = require('crypto'),
    router = func();

//读取配置
var wechat_config = require('./../config/wechat_config.json');
console.log(wechat_config);
var token = wechat_config.token;
var appid = wechat_config.appid;
var appsecret = wechat_config.appsecret;
var encodingAESKey = wechat_config.encodingAESKey;
var config = {
    token: token,
    appid: appid,
    encodingAESKey: encodingAESKey
};

//wechat oauth
var client = new OAuth(appid, appsecret);
var api = new WechatAPI(appid, appsecret);

//微信自动回复
router.all('/wechat', wechat(config, function (req, res, next) {
    // 微信输入信息都在req.weixin上

    var message = req.weixin;

    // var text='印名片，有蜜蜂网印就购了，一键扫码，不管你在何时何地，给您提供名片最优速解决方案！小伙伴们快来围观吧。第一次下单打开分享（将此文章分享到朋友圈并转发给三个微信群）以下链接，将截图发送到蜜蜂网印公众号，享受1元印刷名片活动！（我们的服务项目：设计印刷策划、各类纸品印刷定制服务';

    res.reply("<a href='http://mp.weixin.qq.com/s?__biz=MzA5NTA0MzgwMw==&mid=402876486&idx=1&sn=c3c31197ee8d10c62668cbd601cdf137&scene=1&srcid=1224g9ili1rnHY2fsuNiagxk&from=singlemessage&isappinstalled=0#wechat_redirect'>印名片，有蜜蜂网印就购了，一键扫码，不管你在何时何地，给您提供名片最优速解决方案！小伙伴们快来围观吧。" +
        "第一次下单打开分享（将此文章分享到朋友圈并转发给三个微信群）以下链接，将截图发送到蜜蜂网印公众号，享受3元印刷名片活动！（我们的服务项目：设计印刷策划、各类纸品印刷定制服务</a>");

    /*console.log(message);
     switch (message.Event) {
     case "SCAN":
     res.reply("开发中，稍候访问");
     break;
     case "subscribe":

     res.reply("开发中，稍候访问");

     break;
     default :
     break;

     }
     switch (message.MsgType) {
     case "text":
     res.reply("开发中，稍候访问");
     break;
     case "image":
     res.reply("你好，欢迎你的到来");
     break;
     case "voice":
     res.reply("声音");
     break;
     default :
     break;

     }*/

}));


var url = client.getAuthorizeURL('http://17quay.cn/oauth-openid', '1', 'snsapi_base');
console.log(url);
//注册回调


//skip qknow.com.cn  跳转到首页
router.get('/oauth-openid', function (req, res, next) {
    // console.log(req.query.code);

    console.log(req.query.code);
    var code = req.query.code;

    //获取openid


    client.getUserByCode(code, function (err, result) {
        if (err) {
            // res.send(err);
            res.send("系统繁忙，请重新进入");
        }
        resources.logs.create({
            "ip": req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress

        }, function (err, doc) {
            console.log(err);
            console.log(doc);
        });



        console.log(result);
        var openid = result.openid;
        res.writeHeader(301, {'Location': "http://121wogo.com/?openid=" + openid});
        return res.end();

    });

});

router.get('/oauth-openid-shared', function (req, res, next) {
    // console.log(req.query.code);


    console.log(req.query.code);
    var code = req.query.code;

    client.getUserByCode(code, function(err,result){
        if (err) {
             console.log(err);
            res.send("系统繁忙，请重新进入");
        }
        console.log(result);
        resources.logs.create({
            "ip": req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress

        }, function (err, doc) {
            console.log(err);
            console.log(doc);
        });

        api.getUser(result.openid, function(errr,rersultt){
            if (errr) {
                // res.send(err);
                res.send("系统繁忙，请重新进入");
            }
            console.log(rersultt);
            var openid=rersultt.openid;
            if(rersultt.subscribe==1){
                res.writeHeader(301, {'Location': "http://121wogo.com/?openid=" + openid});
                return res.end();
            }else {
                console.log('11');
                res.writeHeader(301, {'Location': "http://121wogo.com/subscribe?openid=" + openid});
                return res.end();
            }
        });

       /* console.log(result);
        var openid = result.openid;
        res.writeHeader(301, {'Location': "http://121wogo.com/?openid=" + openid});*/

    });


});
//skip qknow.com.cn  跳转到我的订单
router.get('/oauth-openid-selforder', function (req, res, next) {
    // console.log(req.query.code);

    console.log(req.query.code);
    var code = req.query.code;

    //获取openid

    client.getUserByCode(code, function (err, result) {
        if (err) {
            //res.send(err);
            res.send("系统繁忙，请重新进入");
        }
        console.log(result);
        var openid = result.openid;
        res.writeHeader(301, {'Location': "http://121wogo.com/app/order/wddd?openid=" + openid});

        //res.writeHeader(301, {'Location': "http://qknow.com.cn:8001"});
        return res.end();
        //console.log(result);
        //var openid = result.openid;
        //console.log(result.openid);
        /**/
    });

});


router.get("/JSSDK", function (req, res, next) {
    var para_url = req.query.para;
    var param = {
        debug: false,
        jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'chooseImage', 'uploadImage'],
        url: para_url
    };
    api.getJsConfig(param, function (err, result) {
        if (err) {
            res.send(err);
        }
        console.log("jssdk", result);
        //console.log(err);
        //console.log(result);
        return res.send(result);

    });
});


router.post("/qrcode", function (req, res, next) {
    var id = req.body.id;
    var api = new WechatAPI(appid, appsecret);
    resources.activities.findOne().sort({"sceneid": "desc"}).exec(function (errr, docc) {
        if (errr) return err;
        console.log(docc);
        console.log(docc.sceneid + 1);
        api.createLimitQRCode(docc.sceneid + 1, function (err, result) {
            qrcodeurl = api.showQRCodeURL(result.ticket);
            resources.activities.findOne({"_id": id}).exec(function (err, doc) {
                if (err) return res.send(err);
                doc.sceneid = docc.sceneid + 1;
                doc.updateInfo.createTime = new Date();
                doc.qrcodeurl = qrcodeurl;
                doc.save();
                return res.send(qrcodeurl);
            });

        });
    });
});

router.get("/sharedURL", function (req, res, next) {
    var openid = req.query.openid;
    var activity = req.query.activity;
    var url = client.getAuthorizeURL('http://gobiiig.com/oauth-openid1?share=' + openid + "&activity=" + activity, '1', 'snsapi_userinfo');
    return res.send(url);
});


//图片代理
router.get("/imgproxy", function (req, res, next) {
    var url = req.query.url;
    request(url).pipe(res);

});

//下载图片
router.get("/getMedia", function (req, res, next) {
    var media_id = req.query.media_id;
    var api = new WechatAPI(appid, appsecret);
    //'q5BotgQBpTjzFfuBuSAxY5tm1ez6wDMXSbxLhBjmHArc19cKhPWYmOB5WkPRZpL-'
    api.getMedia(media_id, function (err, result, ress) {
        filename = crypto.createHash('sha1').update('' + +new Date()).digest('hex') + "." + ress.headers['content-type'].split('/')[1];

        var myDate = new Date();
        var currentDate = myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate();
        var goalDirPath = './static/material/' + currentDate;
        //判断 目录是否存在
        if (fs.existsSync(goalDirPath)) {
        } else {
            fs.mkdirSync(goalDirPath);
        }
        fs.writeFile("./static/material/" + currentDate + "/" + filename, result, function (err) {
            if (err) {
                res.status(500).send('fail')
            }
            res.send("material/" + currentDate + "/" + filename);
        });

    });

});


module.exports = router;