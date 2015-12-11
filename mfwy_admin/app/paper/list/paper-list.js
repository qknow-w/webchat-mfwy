/**
 * Created by Administrator on 2015/9/14 0014.
 */

angular.module('paper-list', ['resource.cards']).config([
    "$routeProvider", function($routeProvider) {
        return $routeProvider.when("/paper", {
            templateUrl: "/app/paper/list/paper-list.tpl.html",
            controller: 'PaperCtrl'
        });
    }
]).controller('PaperCtrl', [
    "$scope",'$http',"$location","Cards","messager",'ipCookie', function($scope,$http,$location,Cards,messager,ipCookie) {


        //delete
        $scope.orderDelete=function(pid,cid,pageNo){
            $http.delete(config.url.api+"/v1/cards/ctype/"+pid+"/"+cid).success(function(data) {
                /*createOrder(data.value[0].c_type, data.value[0].gongyi);*/
                messager.success("delete successfully.");
                return $scope.setPage(pageNo);
            }).error(function(error) {
                return messager.success("delete fail");

            });

        };



        $scope.setPage = function(pageNo) {
            if(ipCookie('currentAdd')=="0"){
                return Cards.list({
                    $skip: (pageNo - 1) * 10,
                    $top: 10,
                    $count: true
                }, function(data) {
                    console.log(data);
                    return $scope.data = data;
                });
            }else{
                return Cards.list({
                    $skip: (pageNo - 1) * 10,
                    $top: 10,
                    $count: true,
                    $filter:"currentAdd eq '"+ipCookie('currentAdd')+"'"
                }, function(data) {
                   /* console.log(data);
                    data.value[0].c_type.sort(getSortFun('asc', 'num'));
                    console.log(data);*/
                    return $scope.data = data;
                });
            }

        };

        function getSortFun(order, sortBy) {
            var ordAlpah = (order == 'asc') ? '>' : '<';
            var sortFun = new Function('a', 'b', 'return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?1:-1');
            return sortFun;
        }

        return $scope.setPage(1);

    }
]);
