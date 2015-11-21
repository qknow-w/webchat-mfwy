/**
 * Created by Administrator on 2015/11/17 0017.
 */


require.config({
    baseUrl: '/app',
    paths: {
        /*'angular': '/bower_components/angular/angular',
         'uiRoute': '/bower_components/angular-ui-router/release/angular-ui-router.min',
         'jquery': '/bower_components/jquery/dist/jquery',
         'config': '/config/config',
         'swiper': "/bower_components/swiper/dist/js/swiper.min",
         'ngSwiper': "/bower_components/angular-swiper/dist/angular-swiper",
         "weixin": "/bower_components/weixin/weixin",
         'ngCookie':'/bower_components/angular-cookie/angular-cookie.min'*/

        'angularAMD': '/vendo/angularAMD.min',
        'jquery': '/vendo/jquery.min',
        'config': '/config/config',
        'swiper': "/vendo/swiper.min",
        "weixin": "/vendo/weixin",
        'angular': '/vendo/angular.min',
        'uiRoute': '/vendo/angular-ui-router.min',
        'ngSwiper': "/vendo/angular-swiper",
        'ngCookie': '/vendo/angular-cookie.min'
        /* 'domReady': '/bower_components/requirejs-domready/domReady'*/


    },
    shim: {
        /*  'angular': {
         exports: 'angular'
         },*/
        "ngSwiper": ['angular'],
        'uiRoute': ['angular']
        ,
        'ngCookie': ['angular'],
        'angularAMD': ['angular']
        //'bt': ['angular', 'uiRoute', 'jquery', 'config', 'swiper', 'ngSwiper', 'ngCookie']

    },
    deps: ['app'],
    waitSeconds: 0

});

/*require(['app','domReady'], function (app,domReady) {
 angular.bootstrap(document, ['app']);
 domReady(function () {
 document.getElementsByClassName('weui_toast')[0].style.display='none';

 //This function is called once the DOM is ready.
 //It will be safe to query the DOM and manipulate
 //DOM nodes in this function.
 });
 }
 );*/


require(['app'], function () {
        document.getElementsByClassName('weui_toast')[0].style.display = 'none';
    }
);

