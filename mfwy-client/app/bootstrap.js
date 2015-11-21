/**
 * Created by Administrator on 2015/11/3 0003.
 */
require.config({
    baseUrl: '/app',
    paths: {
        'angular': '/bower_components/angular/angular',
        'angular-ui-route': '/bower_components/angular-ui-router/release/angular-ui-router.min',
        'jquery': '/bower_components/jquery/dist/jquery',
        'config':'/config/config',
        'swiper':"/bower_components/Swiper/dist/js/swiper.min",
        'angular-swiper':"/bower_components/angular-swiper/dist/angular-swiper",
        'order':"/js/order"
    },
    shim: {
        'app': {
            deps: ['angular', 'angular-ui-route', 'jquery','config','swiper','angular-swiper','order']
        },
        "angular-swiper":{ deps: ['angular']},
        'angular-ui-route': {
            deps: ['angular']
        }
    }
});

require(['app'], function (app) {
        angular.bootstrap(document, ['app']);
    }
);