/**
 * Created by Administrator on 2015/11/8 0008.
 */
var config = config || {};

config.host = {
    domain: 'localhost',
    public: 'localhost:40000',
    admin: 'localhost:50001',
    feed: 'localhost:50001',
    img: 'localhost:50001',
    api: '17quay.cn'

};

config.url = {
    public: "http://" + config.host.public,
    admin: "http://" + config.host.admin,
    feed: "http://" + config.host.feed,
    img: "http://" + config.host.img,
    api: "http://" + config.host.api
};

config.site = {
    name: '登陆'
};

config.languages = {
    'English': 'en-us',
    '中文': 'zh-cn'
};