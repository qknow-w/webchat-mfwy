/**
 * Created by Administrator on 2015/11/3 0003.
 */
define([], function () {
    var urlArgs = Date.parse(new Date());
    return {
        defaultRoutePath: '/',
        routes: {
            '/': {
                url: "/",
                views: {
                    "header": "/views/home/header.tpl.html?v=" + urlArgs,
                    "adv": "/views/home/adv.tpl.html?v=" + urlArgs,
                    "center": "/views/home/center.tpl.html?v=" + urlArgs,
                    "footer": "/views/home/footer.tpl.html?v=" + urlArgs
                },
                dependencies: [
                    /*'controllers/HomeController'*/
                ]
            },
            "template": {
                url: "/template",
                views: {
                    "header": "/views/tpl/header.tpl.html?v=" + urlArgs,
                    "adv": "/views/tpl/adv.tpl.html?v=" + urlArgs,
                    "center": "/views/tpl/center.tpl.html?v=" + urlArgs,
                    "footer": "/views/home/footer.tpl.html?v=" + urlArgs
                },
                dependencies: [
                    '/app/controllers/TemplateController.js?v=' + urlArgs,
                    '/app/services/templateService.js?v=' + urlArgs
                ]

            },
            "template.tpl": {
                url: "/tpl",
                views: {
                    "tpl-header": "/views/tpl/tpl-header.tpl.html?v=" + urlArgs,
                    "tpl-adv": "/views/home/adv.tpl.html?v=" + urlArgs,
                    "tpl-center": "/views/tpl/tpl-center.tpl.html?v=" + urlArgs
                },
                dependencies: [
                    /*'controllers/OrderController'*/

                ]
            },
            "template.xqxq": {
                url: "/xqxq/:id",
                views: {
                    "tpl-header": "/views/xqxq/xqxq-header.tpl.html?v=" + urlArgs,
                    "tpl-adv": "/views/xqxq/xqxq-adv.tpl.html?v=" + urlArgs,
                    "tpl-center": "/views/xqxq/xqxq-center.tpl.html?v=" + urlArgs
                },
                dependencies: [
                    /*'controllers/OrderController'*/
                    "/app/controllers/WeiXinController.js?" + urlArgs,
                    "/app/services/weixinService.js?" + urlArgs
                ]
            },
            "template.ddxq": {
                url: "/ddxq/:id",
                views: {
                    "tpl-header": "/views/ddxq/ddxq-header.tpl.html?v=" + urlArgs,
                    "tpl-adv": "/views/ddxq/ddxq-adv.tpl.html?v=" + urlArgs,
                    "tpl-center": "/views/ddxq/ddxq-center.tpl.html?v=" + urlArgs
                },
                dependencies: [
                    /*'controllers/OrderController'*/
                ]
            },
            "template.zfdd": {
                url: "/zfdd",
                views: {
                    "tpl-header": "/views/zfdd/header.tpl.html?v=" + urlArgs,
                    "tpl-adv": "/views/zfdd/adv.tpl.html?v=" + urlArgs,
                    "tpl-center": "/views/zfdd/center.tpl.html?v=" + urlArgs
                },
                dependencies: [
                    /*'controllers/OrderController'*/
                ]
            },
            "order": {
                url: "/order",
                views: {
                    "header": "/views/xqxq/header.tpl.html?v=" + urlArgs,
                    "adv": "/views/xqxq/adv.tpl.html?v=" + urlArgs,
                    "center": "/views/xqxq/center.tpl.html?v=" + urlArgs,
                    "footer": "/views/home/footer.tpl.html?v=" + urlArgs
                },
                dependencies: [
                    '/app/controllers/OrderController.js?v=' + urlArgs,
                    '/app/services/orderService.js?v=' + urlArgs
                ]
            },
            "order.xqxq": {
                url: "/xqxq/:id",
                views: {
                    "xqxq-header": "/views/xqxq/xqxq-header.tpl.html?v=" + urlArgs,
                    "xqxq-adv": "/views/home/adv.tpl.html?v=" + urlArgs,
                    "xqxq-center": "/views/xqxq/xqxq-center.tpl.html?v=" + urlArgs
                },
                dependencies: [
                    "/app/controllers/WeiXinController.js?v=" + urlArgs,
                    "/app/services/weixinService.js?v=" + urlArgs
                ]
            },
            "order.ddxq": {
                url: "/ddxq/:id",
                views: {
                    "xqxq-header": "/views/ddxq/ddxq-header.tpl.html?v=" + urlArgs,
                    "xqxq-adv": "/views/ddxq/ddxq-adv.tpl.html?v=" + urlArgs,
                    "xqxq-center": "/views/ddxq/ddxq-center.tpl.html?v=" + urlArgs
                },
                dependencies: [
                    "/app/controllers/WeiXinController.js?v=" + urlArgs,
                    "/app/services/weixinService.js?v=" + urlArgs
                ]
            },
            "order.zfdd": {
                url: "/zfdd",
                views: {
                    "xqxq-header": "/views/zfdd/header.tpl.html?v=" + urlArgs,
                    "xqxq-adv": "/views/zfdd/adv.tpl.html?v=" + urlArgs,
                    "xqxq-center": "/views/zfdd/center.tpl.html?v=" + urlArgs
                },
                dependencies: [
                    "/app/controllers/WeiXinController.js?v=" + urlArgs,
                    "/app/services/weixinService.js?v=" + urlArgs
                ]
            },
            "custom": {
                url: "/custom",
                views: {
                    "header": "/views/gddz/header.tpl.html?v=" + urlArgs,
                    "adv": "/views/gddz/adv.tpl.html?v=" + urlArgs,
                    "center": "/views/gddz/center.tpl.html?v=" + urlArgs,
                    "footer": "/views/home/footer.tpl.html?v=" + urlArgs
                },
                dependencies: [
                    '/app/controllers/CustomController.js?v=' + urlArgs,
                    '/app/services/customService.js?v=' + urlArgs
                ]
            },
            "custom.gddz": {
                url: "/gddz",
                views: {
                    "gddz-header": "/views/gddz/gddz-header.tpl.html?v=" + urlArgs,
                    "gddz-adv": "/views/home/adv.tpl.html?v=" + urlArgs,
                    "gddz-center": "/views/gddz/gddz-center.tpl.html?v=" + urlArgs
                },
                dependencies: [
                    /* 'controllers/HomeController'*/
                ]
            },
            "custom.dzxq": {
                url: "/dzxq/:id",
                views: {
                    "gddz-header": "/views/dzxq/header.tpl.html?v=" + urlArgs,
                    "gddz-adv": "/views/dzxq/adv.tpl.html?v=" + urlArgs,
                    "gddz-center": "/views/dzxq/center.tpl.html?v=" + urlArgs
                },
                dependencies: [
                    /*'controllers/HomeController'*/
                ]
            },
            "custom.zfdd": {
                url: "/zfdd",
                views: {
                    "gddz-header": "/views/zfdd/header.tpl.html?v=" + urlArgs,
                    "gddz-adv": "/views/zfdd/adv.tpl.html?v=" + urlArgs,
                    "gddz-center": "/views/zfdd/center.tpl.html?v=" + urlArgs
                },
                dependencies: [
                    /*'controllers/HomeController'*/
                ]
            },
            "myorder": {
                url: "/order",
                views: {
                    "header": "/views/wddd/header.tpl.html?v=" + urlArgs,
                    "adv": "/views/wddd/adv.tpl.html?v=" + urlArgs,
                    "center": "/views/wddd/center.tpl.html?v=" + urlArgs,
                    "footer": "/views/home/footer.tpl.html?v=" + urlArgs
                },
                dependencies: [
                    '/app/controllers/MyorderController.js?v=' + urlArgs,
                    '/app/services/myorderService.js?v=' + urlArgs,
                    '/app/services/orderService.js?v=' + urlArgs
                ]
            },
            "myorder.wddd": {
                url: "/wddd",
                views: {
                    "wddd-header": "/views/wddd/wddd-header.tpl.html?v=" + urlArgs,
                    "wddd-adv": "/views/wddd/wddd-adv.tpl.html?v=" + urlArgs,
                    "wddd-center": "/views/wddd/wddd-center.tpl.html?v=" + urlArgs
                },
                dependencies: [
                    /*'controllers/HomeController'*/
                ]
            },
            "settle": {
                url: "/settle",
                views: {
                    "header": "/views/mpaj/header.tpl.html?v=" + urlArgs,
                    "adv": "/views/home/adv.tpl.html?v=" + urlArgs,
                    "center": "/views/mpaj/center.tpl.html?v=" + urlArgs,
                    "footer": "/views/home/footer.tpl.html?v=" + urlArgs
                },
                dependencies: [
                    '/app/controllers/SettleController.js?v=' + urlArgs
                ]
            },
            "settle.mpaj": {
                url: "/mpaj",
                views: {
                    "mpaj-header": "/views/mpaj/mpaj-header.tpl.html?v=" + urlArgs,
                    "mpaj-center": "/views/mpaj/mpaj-center.tpl.html?v=" + urlArgs

                },
                dependencies: [
                    /* 'controllers/HomeController'*/
                ]
            },
            "contact": {
                url: "/contact",
                views: {
                    "header": "/views/zrm/header.tpl.html?v=" + urlArgs,
                    "adv": "/views/home/adv.tpl.html?v=" + urlArgs,
                    "center": "/views/zrm/center.tpl.html?v=" + urlArgs,
                    "footer": "/views/home/footer.tpl.html?v=" + urlArgs
                },
                dependencies: [
                    '/app/controllers/ContactController.js?v=' + urlArgs,
                    '/app/services/contactService.js?v=' + urlArgs
                ]
            },
            "contact.zrm": {
                url: "/zrm",
                views: {
                    "zrm-header": "/views/zrm/zrm-header.tpl.html?v=" + urlArgs,
                    "zrm-center": "/views/zrm/zrm-center.tpl.html?v=" + urlArgs
                },
                dependencies: [
                    /*'controllers/HomeController'*/
                ]
            }


        }
    };
});