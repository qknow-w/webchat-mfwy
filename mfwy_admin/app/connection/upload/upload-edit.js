/**
 * Created by Administrator on 2015/12/1 0001.
 */
angular.module('upload-family', []).controller('UploadDialogCtrl', [
    '$scope','$http', 'messager', 'tip','FileUploader', function($scope,$http, messager, tip,FileUploader) {
        //复制order-list.js scope.id
        $scope.id=angular.copy($scope.$parent.id);

        //上传图片
        var images=[];
        var uploaderPositive = $scope.uploaderPositive = new FileUploader({
            url: "" + config.url.api +"/v1/file-upload/designFile?path=designFile",
            removeAfterUpload:true
        });
        var uploaderOpposite = $scope.uploaderOpposite = new FileUploader({
            url: "" + config.url.api +"/v1/file-upload/designFile?path=designFile",
            removeAfterUpload:true
        });
        //上传完成返回路径
        uploaderPositive.onCompleteItem = function (fileItem, response, status, headers) {
            images[0]=response;
            // ad=response;
            // uploaderAd.clearQueue();
        };
        uploaderOpposite.onCompleteItem = function (fileItem, response, status, headers) {
             images[1]=response;
        };

        //保存
        $scope.save = function() {
            return $http.post(config.url.api+"/v1/family/designFile", {"id": $scope.id,"design":images}).success(function (data) {
                messager.success("上传成功");
                return $scope.closeThisDialog();
            }).error(function (error) {
                messager.success("上传失败，请重新上传");
                return $scope.closeThisDialog();
            });

        };
        //取消
         $scope.close = function() {
            return $scope.closeThisDialog();
        };
    }
]);