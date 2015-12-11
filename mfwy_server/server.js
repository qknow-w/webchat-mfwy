/**
 * Created by Administrator on 2015/10/17 0017.
 */
var odata = require('node-odata'),
    morgan = require('morgan'),
    domainError = require('./middleware/domainError'),
    errorhandler = require('errorhandler'),
     WechatAPI = require('wechat-api'),
    cors = require('cors');


//菜单配置文件
var menu = require('./config/menu.json');
//微信配置
var wechat_config = require('./config/wechat_config.json');

//wxc8179212071d81d4
//8fd49e799483ba033bf596befe971b0b
//微信配置文件

var token = wechat_config.token;
var appid = wechat_config.appid;
var appsecret = wechat_config.appsecret;
var encodingAESKey = wechat_config.encodingAESKey;
var weconfig = {
    token: token,
    appid: appid,
    encodingAESKey: encodingAESKey
};


/*
//实例化 WechatAPI
 var api = new WechatAPI(appid, appsecret);
console.log(menu);
 //创建菜单
 api.createMenu(menu, function(err,result){
     console.log(err);
 console.log(result);
 });*/










//config
var config=require("./config/pro_config");

//connect mongodb
//var server = odata('mongodb://120.25.76.44/mfwydb');
var server = odata('mongodb://120.25.76.44/mfwydb');
odata.resources = server.resources;
//middleware

server.use(require("./middleware/authorization"));
server.use(domainError());
server.use(cors({
    exposedHeaders: ["authorization","currentAdd"]

}));
server.use(morgan("short"));

if (config.dev_env === 'development') {
    // only use in development
    server.use(errorhandler())
}

//server set
server.set('prefix', "v1");


//functions
server.use(require('./functions/login'));
server.use(require('./functions/upload'));
server.use(require('./functions/wechatInfo'));
server.use(require('./functions/wechatpay'));
server.use(require('./functions/order'));
server.use(require('./functions/card'));
server.use(require('./functions/family'));
//resources
server.use(require('./resources/system/user'));
server.use(require('./resources/card/card'));
server.use(require('./resources/connection/connection'));
server.use(require('./resources/family/family'));
server.use(require('./resources/order/order'));
server.use(require('./resources/template/template'));
server.use(require('./resources/system/adv'));
server.use(require('./resources/system/site'));
server.use(require('./resources/system/IPLog'));


server.listen(config.dev_por || config.pro_por, function () {
    require('./bootstrap/init-data').import();
    console.log('Express server listening on port ' + process.env.PORT || 40002);
});