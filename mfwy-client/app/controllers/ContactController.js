/**
 * Created by Administrator on 2015/11/3 0003.
 */
define(['app'], function (app) {
    app.controller('ContactController', ['$scope','contactService', function ($scope,contactService) {

        return contactService.list().then(function(data){
               $scope.contactlist=data;
            console.log(data);
        })
    }
    ]);
});