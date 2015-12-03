/**
 * Created by Administrator on 2015/12/2 0002.
 */

var func = require('node-odata').Function;
var resources = require('node-odata').resources;
var router = func();


// update order designFile
router.post("/v1/family/designFile",function(req,res,next){
    var id=req.body.id;
    var images=req.body.design;
    var arr=eval(images);
    resources.families.findById(id).exec(function (err, result){
        if(err)  res.status(500).send(err);
        arr.forEach(function(value,index){
            result.images.push(value);
        });
        result.states=true;
        result.save();
        res.send("success");
    });
});







module.exports = router;