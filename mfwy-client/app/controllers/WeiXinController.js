/**
 * Created by Administrator on 2015/11/15 0015.
 */
define(['app', 'weixin'], function (app, wx) {
    app.controller('WeiXinController', ['$scope', '$http', '$window', '$timeout', 'weixinService', function ($scope, $http, $window, $timeout, weixinService) {
        var images = {
            localId: [],
            serverId: []
        };
        //上传toast
        $scope.toast = {
            upload: false,
            message: ""
        };
        //选择照片
        $scope.chooseImage = function () {
            wx.chooseImage({
                success: function (res) {
                    images.localId = res.localIds;

                }
            });

        };
        //上传照片
        $scope.upload = function () {
            if (images.localId.length == 0) {
                $scope.toast.upload = true;
                $scope.toast.message = "请先选择照片";
                $timeout(function () {
                    $scope.toast.upload = false;

                }, 700);
                return;
            }
            /*for(var i=0;v< images.localId.length;i++){
             wx.uploadImage({
             localId: images.localId[i],
             success: function (res) {
             alert('已上传：' + i + '/' + length);

             $http.get(config.url.api+"/getMedia?media_id="+res.serverId).success(function(data){
             alert(data);
             $scope.$emit('imagePath', data);
             });
             //images.serverId.push(res.serverId);
             },
             fail: function (res) {
             alert(JSON.stringify(res));
             }
             });
             }*/

            var i = 0, length = images.localId.length;
            images.serverId = [];
            function upload() {
                wx.uploadImage({
                    localId: images.localId[i],
                    success: function (res) {
                        i++;
                        //下载到服务器
                        $http.get(config.url.api + "/getMedia?media_id=" + res.serverId).success(function (data) {
                            images.serverId.push(data);
                        });
                        //images.serverId.push(res.serverId);
                        if (i < length) {
                            upload();
                        }
                    },
                    fail: function (res) {
                        // alert(JSON.stringify(res));
                        $scope.toast.message = "上传失败，请重新选择照片上传";
                        $scope.toast.upload = true;
                        $timeout(function () {
                            $scope.toast.upload = false;
                        }, 900);
                    }
                });
            }

            upload();
            $scope.toast.message = "上传完成";
            $scope.toast.upload = true;
            $timeout(function () {
                $scope.toast.upload = false;
            }, 900);
            $scope.$emit('imagePath', images.serverId);
        };

        //分享给朋友
        wx.onMenuShareAppMessage({
            title: "蜜蜂网印", // 分享标题   活动名称
            desc: "蜜蜂网印", // 分享描述   活动主题
            link: "http://www.mfwy.net/", // 分享链接
            imgUrl: "http://www.mfwy.net/UploadFolder/2015-04-17/20150417172835800470047-699-344.jpg", // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                $scope.$emit('shareSuccess', "success");
                // 用户确认分享后执行的回调函数
                $scope.toast.upload = true;
                $scope.toast.message = "分享成功";
                $timeout(function () {
                    $scope.toast.upload = false;

                }, 700);

            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                $scope.toast.upload = true;
                $scope.toast.message = "分享失败，请重新分享";
                $timeout(function () {
                    $scope.toast.upload = false;

                }, 700);

            }
        });


        //分享到朋友圈
        wx.onMenuShareTimeline({
            title: "蜜蜂网印", // 分享标题   活动名称
            link: "http://www.mfwy.net/", // 分享链接
            imgUrl: "http://www.mfwy.net/UploadFolder/2015-04-17/20150417172835800470047-699-344.jpg", // 分享图标
            success: function () {
                $scope.$emit('shareSuccess', "success");
                // 用户确认分享后执行的回调函数
                $scope.toast.upload = true;
                $scope.toast.message = "分享成功";
                $timeout(function () {
                    $scope.toast.upload = false;

                }, 700);

            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                // 用户取消分享后执行的回调函数
                $scope.toast.upload = true;
                $scope.toast.message = "分享失败，请重新分享";
                $timeout(function () {
                    $scope.toast.upload = false;

                }, 700);
            }
        });


        var ua = $window.navigator.userAgent.toLowerCase();
        //var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return weixinService.getConfig().then(function (result) {
                wx.config({
                    debug: false,
                    appId: result.appId,
                    timestamp: result.timestamp,
                    nonceStr: result.nonceStr,
                    signature: result.signature,
                    jsApiList: [
                        //'checkJsApi',
                        'onMenuShareAppMessage',
                        'onMenuShareTimeline',
                        'chooseImage',
                        'uploadImage'
                    ]
                });
                wx.error(function (res) {
                    //alert("系统繁忙，请关闭后重新进入");
                    // WeixinJSBridge.call('closeWindow');
                    //alert(res);
                    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                });
            });
        } else {


            //return false;
        }


    }
    ]);
});