/**
 * Created by Administrator on 2015/12/14 0014.
 */
var func = require('node-odata').Function;
var resources = require('node-odata').resources;
var router = func();

router.post("/v1/users/new/init", function (req, res, next) {
    resources.cards.findOne({"currentAdd":'a235ab81-d42e-4b99-b593-86ef274bf0b9'}).exec(function (err, result) {
        if(err)  res.status(500).send(err);
        console.log(result);
        resources.cards.create({"c_type":result.c_type,"gongyi":result.gongyi,"currentAdd":req.body.addid},function(err,result1){
            if(err)  res.status(500).send(err);
            res.send('success');
            resources.templates.find({"currentAdd":'a235ab81-d42e-4b99-b593-86ef274bf0b9'}).exec(function(errr,resulttpl){

                if(errr)  res.status(500).send(err);
                var len=resulttpl.length;
                console.log(len);
                for(var i=0;i<len;i++){
                    resources.templates.create( {
                        name: resulttpl[i].name,//名称
                        price: resulttpl[i].price,//地址
                        card: resulttpl[i].card,//时间  数组  开始时间和结束时间
                        images: resulttpl[i].images,//图片  广告、海报
                        type:resulttpl[i].type,
                        states:resulttpl[i].states,
                        "currentAdd":req.body.addid},function(errrrr,result){

                        if(i==len-1){
                            if(errrrr)res.status(500).send(err);
                            res.send('success');
                        }


                    });
                }
               /* */
            })
        })
    });
});




module.exports = router;



