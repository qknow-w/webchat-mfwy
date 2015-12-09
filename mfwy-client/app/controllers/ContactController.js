/**
 * Created by Administrator on 2015/11/3 0003.
 */
define(['app'], function (app) {
    app.controller('ContactController', ['$scope','$rootScope','contactService', function ($scope,$rootScope,contactService) {

        return contactService.list($rootScope.addressDefault.selectAdd).then(function(data){
               $scope.contactlist=data;
            console.log(data);
        })
    }
    ]);
});