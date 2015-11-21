/**
 * Created by Administrator on 2015/9/15 0015.
 */
angular.module("order-edit", ["resource.orders"]).config([
    "$routeProvider", function ($routeProvider) {
        return $routeProvider.when("/order/:id", {
            templateUrl: "/app/order/edit/order-edit.tpl.html",
            controller: 'OrderEditCtrl',
            resolve: {
                order: [
                    "$q", "$route", "Orders", function ($q, $route, Orders) {
                        var deferred;
                        deferred = $q.defer();
                        Orders.get({
                            id: $route.current.params.id
                        }, function (data) {
                            return deferred.resolve(data);
                        });
                        return deferred.promise;
                    }
                ]
            }
        })
    }
])
    .controller("OrderEditCtrl", ["$scope", "$routeParams", "$location", "$rootScope","$http", "FileUploader", "Orders", "order", "messager",
        function ($scope, $routeParams, $location, $rootScope,$http, FileUploader,Orders, order, messager) {



            $scope.get = function () {

                $scope.entity = order;

               // console.log($scope.entity.images.ad);
            };



            return $scope.get();


        }]);