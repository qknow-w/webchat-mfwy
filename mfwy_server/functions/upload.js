/**
 * Created by Administrator on 2015/9/15 0015.
 */
var fs, func, mkdirp, resources, router, multiparty, path,crypto;

fs = require("fs");

mkdirp = require('mkdirp');



func = require('node-odata').Function;

resources = require('node-odata').resources;

router = func();
multiparty = require('multiparty');
path = require('path');
crypto=require('crypto');

//上传图片
router.post('/v1/file-upload', function (req, res, next) {

    var form = new multiparty.Form();

    form.parse(req, function (err, fields, files) {
        var complated, fileExtension, filename, height, sourcePath, targetFolder, targetPath, width, _ref, _ref1;
        //原路径
        sourcePath = files.file[0].path;
        //目标路径
        targetFolder = "./static/template/" + req.query.path;
        mkdirp(targetFolder);
        //文件名 加密
        filename =crypto.createHash('sha1').update('' + +new Date()).digest('hex');
        //扩展名
        fileExtension = path.extname(files.file[0].originalFilename);
        targetPath = targetFolder + '/' + filename + fileExtension;
        fs.createReadStream(sourcePath).pipe(fs.createWriteStream(targetPath));

        fs.unlink(sourcePath, function() {
            if (err) {
                throw err;
            }
            res.set("Connection", 'keep-alive');
            return res.send('/template/' + req.query.path + '/' + filename + fileExtension);
        });

    });

});

//返回图片
router.get("/v1/images",function(req, res, next){
    var name=req.query.name;
    res.sendFile('/Project/webchat-mfwy/mfwy_server/static/'+name);
});




module.exports = router;