/**
 * Created by Administrator on 2015/11/15 0015.
 */
function share(ac) {
    var config = $.ajax({
        url: "http://gobiiig.com/JSSDK?para=" + location.href.split('#')[0],
        type: "get"
    });
    var url="";
    config.then(function (configres) {
        wxconfig(configres);
    });
    function wxconfig(result) {
        wx.config({
            debug: false,
            appId: result.appId,
            timestamp: result.timestamp,
            nonceStr: result.nonceStr,
            signature: result.signature,
            jsApiList: [
                //'checkJsApi',
                "chooseImage",
                "previewImage",
                "uploadImage",
                "downloadImage"
            ]
        });
    }

    wx.error(function (res) {
        alert(res);
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    });
    wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
            var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        }
    });
    wx.uploadImage({
        localId: '', // 需要上传的图片的本地ID，由chooseImage接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function (res) {
            var serverId = res.serverId; // 返回图片的服务器端ID
        }
    });
}

