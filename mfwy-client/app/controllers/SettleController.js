/**
 * Created by Administrator on 2015/11/3 0003.
 */
define(['app'], function (app) {
    app.controller('SettleController', ['$scope', '$timeout','$location', 'ipCookie', 'settleService', function ($scope, $timeout,$location, ipCookie, settleService) {
        //监听上传回调
        $scope.$on('imagePath', function (event, data) {
            //父级能得到值
            $scope.settle.images = data;
        });
        //上传toast
        $scope.toast = {
            upload: false,
            message: ""
        };

        //名片安家模型
        $scope.settle = {
            "openid": ipCookie('openid'),
            "images": []
        };

        //查看名片
        $scope.seeCard = function () {
            settleService.seeCard(ipCookie('openid')).then(function (data) {
                console.log(data);
                if(data.length>0){
                    if(data[0].states){
                        $scope.images=data[0].images;
                        $location.path('/app/settle/detail');
                    }else{
                        $scope.toast.message = "名片正在设计中，请稍候查看";
                        $scope.toast.upload = true;
                        $timeout(function () {
                            $scope.toast.upload = false;
                        }, 900);
                    }
                }else{
                    $scope.toast.message = "名片正在设计中，请稍候查看";
                    $scope.toast.upload = true;
                    $timeout(function () {
                        $scope.toast.upload = false;
                    }, 900);
                }

            });


        };



        //提交名片信息
        $scope.submitSettle = function () {
            if ($scope.settle.images.length == 0) {
                $scope.toast.message = "请先选择照片上传";
                $scope.toast.upload = true;
                $timeout(function () {
                    $scope.toast.upload = false;
                }, 900);
                return
            }
            settleService.addFamily($scope.settle).then(function () {
                $scope.toast.message = "添加成功，后台正在设计中，完成后可在此页面查看";
                $scope.toast.upload = true;
                $timeout(function () {
                    $scope.toast.upload = false;
                }, 900);
            })
        }


    }
    ]);
});