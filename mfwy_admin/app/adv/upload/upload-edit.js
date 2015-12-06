/**
 * Created by Administrator on 2015/12/1 0001.
 */
angular.module('upload-adv', []).controller('UploadDialogCtrlAdv', [
    '$scope','$http', '$location','messager', 'tip','FileUploader','ipCookie', function($scope,$http,$location, messager, tip,FileUploader,ipCookie) {
        //上传图片
        var images=[];
        var uploaderPositive = $scope.uploaderPositive = new FileUploader({
            url: "" + config.url.api +"/v1/file-upload?path=adv",
            removeAfterUpload:true
        });
        /*var uploaderOpposite = $scope.uploaderOpposite = new FileUploader({
            url: "" + config.url.api +"/v1/file-upload?path=adv",
            removeAfterUpload:true
        });*/
        //上传完成返回路径
        uploaderPositive.onCompleteItem = function (fileItem, response, status, headers) {
            images[0]=response;
            // ad=response;
            // uploaderAd.clearQueue();
        };
       /* uploaderOpposite.onCompleteItem = function (fileItem, response, status, headers) {
             images[1]=response;
        };*/

        //保存
        $scope.save = function() {

            return $http.post(config.url.api+"/v1/adv",{"images":images[0],"currentAdd":ipCookie('currentAdd')}).success(function (data) {
                messager.success("保存成功，请重新刷新");
                return $scope.closeThisDialog();
            }).error(function (error) {
                messager.success("保存失败，请重新保存");
                return $scope.closeThisDialog();
            });

        };
        //取消
         $scope.close = function() {
             messager.success("请重新刷新");
             $scope.closeThisDialog();

        };
    }
]);