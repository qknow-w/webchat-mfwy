/**
 * Created by Administrator on 2015/9/15 0015.
 */
var fs, func, mkdirp, resources, router, multiparty, path, crypto;

fs = require("fs");
mkdirp = require('mkdirp');
func = require('node-odata').Function;
resources = require('node-odata').resources;
router = func();
multiparty = require('multiparty');
path = require('path');
crypto = require('crypto');
var JSZip = require("jszip");
var uuid = require('node-uuid');
var xlsx = require('node-xlsx');
co = require('co');

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
        filename = crypto.createHash('sha1').update('' + +new Date()).digest('hex');
        //扩展名
        fileExtension = path.extname(files.file[0].originalFilename);
        targetPath = targetFolder + '/' + filename + fileExtension;
        fs.createReadStream(sourcePath).pipe(fs.createWriteStream(targetPath));

        fs.unlink(sourcePath, function () {
            if (err) {
                throw err;
            }
            res.set("Connection", 'keep-alive');
            return res.send('/template/' + req.query.path + '/' + filename + fileExtension);
        });

    });
});



//上传设计文件图片
router.post('/v1/file-upload/designFile', function (req, res, next) {
    var form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {
        var complated, fileExtension, filename, height, sourcePath, targetFolder, targetPath, width, _ref, _ref1;

        //原路径
        sourcePath = files.file[0].path;
        //目标路径
        var myDate = new Date();
        var currentDate = myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate();
        targetFolder = './static/'+req.query.path+"/" + currentDate;
        mkdirp(targetFolder);
        //文件名 加密
        filename = crypto.createHash('sha1').update('' + +new Date()).digest('hex');
        //扩展名
        fileExtension = path.extname(files.file[0].originalFilename);
        targetPath = targetFolder + '/' + filename + fileExtension;
        fs.createReadStream(sourcePath).pipe(fs.createWriteStream(targetPath));

        fs.unlink(sourcePath, function () {
            if (err) {
                throw err;
            }
            res.set("Connection", 'keep-alive');
            return res.send(req.query.path +"/" + currentDate+ '/' + filename + fileExtension);
        });

    });
});





//返回图片
router.get("/v1/images", function (req, res, next) {
    var name = req.query.name;
   // res.sendFile('/Project/webchat-mfwy/mfwy_server/static/' + name);
    res.sendFile('/home/mfwy-server/static/' + name);
});


//压缩单个图片下载
router.get('/v1/file/zip/:id', function (req, res, next) {
    resources.orders.findById(req.params.id).exec(function (err, result) {
        if (err)  res.status(500).send(err);

        var zip = new JSZip();
        //添加图片
        result.images.forEach(function (value, index) {
            zip.folder("images").file(value, fs.readFileSync("static/" + value));
        });
        //添加excel
        var excel = [];
        excel.push(["订单号", "名片类型", "名片工艺", "支付类型", "姓名", "地址", "电话", "数量", "总金额"]);
        excel.push([result.no, result.card.c_type, result.card.gongyi, result.payInfo.payType, result.userInfo.name,
            result.userInfo.address, result.userInfo.phone, result.num, result.totalMoney]);
        var buffer = xlsx.build([{name: "订单excel", data: excel}]); // returns a buffer
        zip.file(uuid.v1() + ".xlsx", buffer);//

        var data = zip.generate({base64: false, compression: 'DEFLATE'});
        var zipname = uuid.v1();

        var myDate = new Date();
        var currentDate = myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate();
        var goalDirPath = 'static/zip/' + currentDate;
        //判断 目录是否存在
        if (fs.existsSync(goalDirPath)) {
        } else {
            fs.mkdirSync(goalDirPath);
        }
        fs.writeFile('static/zip/' + currentDate + "/" + zipname + ".zip", data, 'binary', function (err) {
            // res.send('static/zip/'+zipname+".zip");
            //res.sendFile('/Project/webchat-mfwy/mfwy_server/static/zip/'+zipname+".zip");
            res.setHeader("Content-Disposition", "attachment;filename=\"" + zipname + "\".zip");
           // res.sendFile('/Project/webchat-mfwy/mfwy_server/static/zip/' + currentDate + "/" + zipname + ".zip");
            res.sendFile('/home/mfwy-server/static/zip/' + currentDate + "/" + zipname + ".zip");
        });

    });
});

//压缩多个个图片下载
router.get('/v1/file/multil/zip', function (req, res, next) {
    //var multi = ["90240a36-a15c-4c01-a9a2-a63591fbce71", "0734f277-1448-45dc-8ded-65727de70802"];

    var multi=req.query.multi;
    multi=multi.split(',');
    var zip = new JSZip();
    multi.forEach(function (valuee, indexx) {
        console.log(indexx);
        resources.orders.findById(valuee).exec(function (err, result) {
            if (err)  res.status(500).send(err);
            console.log(result);
            //添加图片
            result.images.forEach(function (value, index) {
                zip.folder(result.no + "/images").file(value, fs.readFileSync("static/" + value));
            });
            //添加excel
            var excel = [];
            excel.push(["订单号", "名片类型", "名片工艺", "支付类型", "姓名", "地址", "电话", "数量", "总金额"]);
            excel.push([result.no, result.card.c_type, result.card.gongyi, result.payInfo.payType, result.userInfo.name,
                result.userInfo.address, result.userInfo.phone, result.num, result.totalMoney]);
            var buffer = xlsx.build([{name: "订单excel", data: excel}]); // returns a buffer
            zip.file(result.no + "/" + uuid.v1() + ".xlsx", buffer);//

            if (indexx == (multi.length - 1)){
                var data = zip.generate({base64: false, compression: 'DEFLATE'});
                var zipname = uuid.v1();
                var myDate = new Date();
                var currentDate = myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate();
                var goalDirPath = 'static/zip/' + currentDate;
                //判断 目录是否存在
                if (fs.existsSync(goalDirPath)) {
                } else {
                    fs.mkdirSync(goalDirPath);
                }
                fs.writeFile('static/zip/' + currentDate + "/" + zipname + ".zip", data, 'binary', function (err) {
                    // res.send('static/zip/'+zipname+".zip");
                    //res.sendFile('/Project/webchat-mfwy/mfwy_server/static/zip/'+zipname+".zip");
                    res.setHeader("Content-Disposition", "attachment;filename=\"" + zipname + "\".zip");
                    //res.sendFile('/Project/webchat-mfwy/mfwy_server/static/zip/' + currentDate + "/" + zipname + ".zip");
                    res.sendFile('/home/mfwy-server/static/zip/' + currentDate + "/" + zipname + ".zip");
                });
            }
        });
    });


});


module.exports = router;