/**
 * Created by Administrator on 2015/9/13 0013.
 */
var wechat = require('wechat'),
    OAuth = require('wechat-oauth'),
    WechatAPI = require('wechat-api'),
    func = require('node-odata').Function,
    resources = require('node-odata').resources,
    request = require("request"),
    fs=require('fs'),
    crypto=require('crypto'),
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


//微信自动回复
router.all('/wechat', wechat(config, function (req, res, next) {
    // 微信输入信息都在req.weixin上

    var message = req.weixin;

    console.log(message);
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

    }

}));



var url = client.getAuthorizeURL('http://17quay.cn/oauth-openid', '1', 'snsapi_base');
console.log(url);
//注册回调

router.get('/oauth-openid', function (req, res, next) {
    // console.log(req.query.code);

    console.log(req.query.code);
    var code = req.query.code;

    //获取openid

    client.getUserByCode(code, function (err, result) {
        if (err) {
            res.send(err);
        }
        console.log(result);
        var openid = result.openid;
        res.writeHeader(301, {'Location': "http://qknow.com.cn?openid="  + openid });

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
    var api = new WechatAPI(appid, appsecret);
    var param = {
        debug: false,
        jsApiList: ['openLocation', 'getLocation','chooseImage','uploadImage'],
        url: para_url
    };
    api.getJsConfig(param, function (err, result) {
        if (err) {
            res.send(err);
        }
        console.log("jssdk",result);
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
    api.getMedia(media_id, function(err,result,ress){
        filename =crypto.createHash('sha1').update('' + +new Date()).digest('hex')+"."+ress.headers['content-type'].split('/')[1];
        fs.writeFile("./static/material/"+filename,result,function(err){
            if(err){res.status(500).send('fail')}
            res.send("material/"+filename);
        });

    });

});


module.exports = router;