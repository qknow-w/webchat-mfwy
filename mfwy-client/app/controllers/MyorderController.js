/**
 * Created by Administrator on 2015/11/3 0003.
 */
define(['app'], function (app) {
    app.controller('MyorderController', ['$scope','$location','myorderService','ipCookie', 'orderService',function ($scope,$location,myorderService,ipCookie,orderService) {
        $scope.myorder=[];
        //弹出框
        $scope.dialog={
            selfOrder:false,
            message:""
        };
        //订单详情
        $scope.orderDedail = {
            num: "",
            openid: "",
            order_type:0,
            images: [],
            no: "",
            payInfo: {
                payType: ""
            },
            temInfo: {
                id: "",
                type: "",
                price: ""
            },
            totalMoney: 0,
            card: {
                c_type: "",
                gongyi: ""
            },
            userInfo: {
                name: "",
                id: "",
                address: "",
                phone: "",
                QQ: "",
                company: "",
                note: ""    //地址备注
            },
            expressInfo: {
                no: "",
                state: ""
            },
            states: 0,
            note: ""
        };


        //图片路径
        $scope.imagesPath=config.url.api+"/v1/images?name=";
       //所有订单
        $scope.all=function(){
           $('.all').addClass('border_bottom').siblings().removeClass('border_bottom');
           myorderService.list(ipCookie("openid")).then(function(result){
                console.log("all",result);
                $scope.myorder=result;
                //$scope.$apply();
                console.log($scope.myorder);
            });
        };
        //等待支付
        $scope.topaid=function(){
            $('.to-paid').addClass('border_bottom').siblings().removeClass('border_bottom');
            myorderService.notPay(ipCookie("openid")).then(function(result){
                console.log("topaid",result);
                $scope.myorder=result;
                console.log($scope.myorder);
            });
        };

        //等待发货
        $scope.waitDelivery=function(){
            $('.shipped').addClass('border_bottom').siblings().removeClass('border_bottom');
            myorderService.waitDelivery(ipCookie("openid")).then(function(result){
                $scope.myorder=result;
                //$scope.$apply();
                console.log($scope.myorder);
            });
        };
        //等待收货
        $scope.received=function(){
            $('.received').addClass('border_bottom').siblings().removeClass('border_bottom');
            myorderService.takeDelivery(ipCookie("openid")).then(function(result){
                $scope.myorder=result;
                //$scope.$apply();
                console.log($scope.myorder);
            });
        };


        //取消订单 dialog
        $scope.cancelOrder=function(){
            $scope.dialog.message="取消订单请联系询问客服";
            $scope.dialog.selfOrder=true;
        };

        //关闭dialog
        $scope.cancelDialog=function(){
            $scope.dialog.message="";
            $scope.dialog.selfOrder=false;
        };

        //΢微信支付
        $scope.wechatPay=function(id){

            alert(id);
            var data={"id":id};
            orderService.secondPay(data).then(function (data) {
                WeixinJSBridge.invoke('getBrandWCPayRequest', data, function (res) {
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                        $scope.all();
                    } else {
                        $scope.dialog.message="支付失败，请重新支付";
                        $scope.dialog.selfOrder=true;
                    }
                });
            });
        };


        //第二次货到付款
        $scope.secondCOD = function (no,openid) {
            orderService.deliveryPay(no,openid).then(function (data) {
                $scope.dialog.message="货到付款订单成功";
                $scope.dialog.selfOrder=true;
                $scope.all();
            },function(err){
                $scope.dialog.message="订单失败，请重新订单";
                $scope.dialog.selfOrder=true;
                $scope.all();
            });
        };

        //确认收获
        $scope.confirm=function(id){
            myorderService.confirm(id).then(function (data) {
                $scope.dialog.message="确认收货成功";
                $scope.dialog.selfOrder=true;
                $scope.all();
            },function(err){
                $scope.dialog.message="确认收获失败,请重新确认";
                $scope.dialog.selfOrder=true;
                $scope.all();
            });

        };

        //删除订单
        $scope.deleteOrder=function(id){
            myorderService.deleteOrder(id).then(function (data) {
                $scope.dialog.message="删除成功";
                $scope.dialog.selfOrder=true;
                $scope.all();
            },function(err){
                $scope.dialog.message="删除成功失败,请重新删除";
                $scope.dialog.selfOrder=true;
                $scope.all();
            });

        };


        //完全删除删除订单
        $scope.deleteOrderr=function(id){
            myorderService.deleteOrderr(id).then(function (data) {
                $scope.dialog.message="删除成功";
                $scope.dialog.selfOrder=true;
                $scope.all();
            },function(err){
                $scope.dialog.message="删除成功失败,请重新删除";
                $scope.dialog.selfOrder=true;
                $scope.all();
            });

        };

        //订单详情
        $scope.orderDetail=function(id){
            myorderService.detailedOrder(id).then(function (data) {
                $location.path("/app/order/detail");
                $scope.orderDedail=data;
                console.log(data);
                console.log($scope.orderDedail);
            },function(err){

            });

        };

        return myorderService.list(ipCookie("openid")).then(function(result){
            $scope.myorder=result;
            console.log(result);
        });

    }
    ]);
});