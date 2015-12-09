/**
 * Created by Administrator on 2015/9/14 0014.
 */

angular.module('order-list', ['resource.orders']).config([
    "$routeProvider", function ($routeProvider) {
        return $routeProvider.when("/order", {
            templateUrl: "/app/order/list/order-list.tpl.html",
            controller: 'OrderCtrl'
        });
    }
]).controller('OrderCtrl', [
    "$scope", '$http', "$location", "Orders", "messager", 'ipCookie','ngDialog', function ($scope, $http, $location, Orders, messager, ipCookie,ngDialog) {

        $scope.search = "";
        //delete order
        $scope.orderDelete = function (id, pageNo) {
            return $http.post(config.url.api + "/v1/orders/delete", {"id": id}).success(function (data) {
                messager.success("delete successfully.");
                $scope.setPage(pageNo);
            }).error(function (error) {
                messager.success("delete fail.");
            });

        };
        // page
        $scope.setPage = function (pageNo) {
            if(ipCookie('currentAdd')=="0"){
                return $http.get(config.url.api + "/v1/orders/pagination?skip=" + (pageNo - 1) * 10 +  "&search=" + $scope.search).success(function (data) {
                    return $scope.data = data;
                }).error(function (error) {

                });
            }else{
                return $http.get(config.url.api + "/v1/orders/pagination?skip=" + (pageNo - 1) * 10 + "&top=10&currentAdd=" + ipCookie('currentAdd') + "&search=" + $scope.search).success(function (data) {
                    return $scope.data = data;
                }).error(function (error) {

                });
            }


        };

        // 发货
        $scope.orderSend = function (id, pageNo) {
            return $http.post(config.url.api + "/v1/orders/send", {"id": id}).success(function (data) {
                messager.success("发货成功");
                $scope.setPage(pageNo);
            }).error(function (error) {
                messager.success("发货失败，请重新发货");
            });

        };

        //search
        $scope.orderSearch = function () {
            return $http.get(config.url.api + "/v1/orders/pagination?skip=0&top=10&currentAdd=" + ipCookie('currentAdd') + "&search=" + $scope.search).success(function (data) {
                return $scope.data = data;
            }).error(function (error) {

            });
        };

        //import excel
        $scope.importOrder = function () {
            window.location.href = config.url.api + "/v1/orders/excel/all?currentAdd=" + ipCookie('currentAdd') + "&search=" + $scope.search;

        };
        //download zip
        $scope.orderDownload = function (id) {
            window.location.href = config.url.api + "/v1/file/zip/" + id;

        };
        //multiDownload
        $scope.multiDownload = function () {

            if(choseArr.length==0){
                messager.success("请选择批量下载的文件");
                return
            }
            window.location.href = config.url.api + "/v1/file/multil/zip?multi="+choseArr ;
        };

        var choseArr = [];//定义数组用于存放前端显示
        $scope.master = false;
        $scope.x = false;//默认未选中
        //var flag='all';//是否点击了全选，是为a
        //全选
        $scope.selectAll = function (c, v) {//全选
            if (c == true) {
                $scope.x = true;
                $scope.data.value.forEach(function(value,index){
                    choseArr.push(value.id);
                });
            } else {
                $scope.x = false;
                choseArr = [];
            }
            console.log(choseArr);
        };
        //单选或者选
        $scope.chk = function (id, x) {
            if (x == true) {
                choseArr.push(id)
            } else {
                var index = inArray(id, choseArr, true);
                baoremove(choseArr,index);
            }

            console.log(choseArr);
        };

        //上传设计文件 dialog
        $scope.uploadFile=function(id){
            $scope.id=id;
            ngDialog.open({
                template: '/app/order/upload/upload-edit.tpl.html',
                controller: 'UploadDialogCtrl1',
                scope:$scope
            });
        };
        //接受业务 下单
        $scope.acceptOrder=function(id,pageNo){
            return $http.post(config.url.api+"/v1/orders/accept", {"id": id}).success(function (data) {
                messager.success("下单成功，尽快完成任务");
                $scope.setPage(pageNo);
            }).error(function (error) {
                messager.success("下单失败，请重新下单");
            });
        };



        //判断否在数组中
        function inArray(needle, array, bool) {
            if (typeof needle == "string" || typeof needle == "number") {
                for (var i in array) {
                    if (needle === array[i]) {
                        if (bool) {
                            return i;
                        }
                        return true;
                    }
                }
                return false;
            }
        }

        //移除下标
        function baoremove(array,dx) {
            if (isNaN(dx) || dx > array.length) {
                return false;
            }
            for (var i = 0, n = 0; i < array.length; i++) {
                if (array[i] != array[dx]) {
                    array[n++] = array[i]
                }
            }
            array.length -= 1
        }

        return $scope.setPage(1);

    }
]);
