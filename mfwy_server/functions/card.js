/**
 * Created by Administrator on 2015/11/29 0029.
 */

var func = require('node-odata').Function;
var resources = require('node-odata').resources;
var router = func();

//find card.c_type.id
router.get("/v1/cards/ctype/:pid/:cid", function (req, res, next) {
    var id = req.params.id;
    resources.cards.findById(req.params.pid).exec(function (err, result) {
        if (err)  res.status(500).send(err);
        var children = result.c_type.id(req.params.cid);
        res.send(children);
    });
});

//modify card.c_type.id
router.post("/v1/cards/ctype/:pid/:cid", function (req, res, next) {
    console.log(req.body.id);
    resources.cards.findById(req.params.pid).exec(function (err, result) {
        if (err)  res.status(500).send(err);
        var children = result.c_type.id(req.params.cid);
        children.price = req.body.price;
        children.name = req.body.name;
        children.images = req.body.images;
        children.num = req.body.num;
        result.save();
        res.send("success");
    });
});


//modify card.c_type.id
router.delete("/v1/cards/ctype/:pid/:cid", function (req, res, next) {
    resources.cards.findById(req.params.pid).exec(function (err, result) {
        if (err)  res.status(500).send(err);
        result.c_type.id(req.params.cid).remove();
        result.save();
        res.send("success");
    });
});


//add card.c_type
router.post("/v1/cards/ctype/:pid/", function (req, res, next) {
    resources.cards.findById(req.params.pid).exec(function (err, result) {
        if (err)  res.status(500).send(err);
        result.c_type.push({"name": req.body.name, "price": req.body.price,"images":req.body.images,"num":req.body.num});
        result.save();
        res.send("success");
    });
});


//find card.gongyi.id
router.get("/v1/cards/gongyi/:pid/:cid", function (req, res, next) {
    resources.cards.findById(req.params.pid).exec(function (err, result) {
        if (err)  res.status(500).send(err);
        var children = result.gongyi.id(req.params.cid);
        res.send(children);
    });
});

//modify card.gongyi.id
router.post("/v1/cards/gongyi/:pid/:cid", function (req, res, next) {
    console.log(req.body.id);
    resources.cards.findById(req.params.pid).exec(function (err, result) {
        if (err)  res.status(500).send(err);
        var children = result.gongyi.id(req.params.cid);
        children.price = req.body.price;
        children.name = req.body.name;
        children.images = req.body.images;
        children.num = req.body.num;
        result.save();
        res.send("success");
    });
});


//modify card.gongyi.id
router.delete("/v1/cards/gongyi/:pid/:cid", function (req, res, next) {
    resources.cards.findById(req.params.pid).exec(function (err, result) {
        if (err)  res.status(500).send(err);
        result.gongyi.id(req.params.cid).remove();
        result.save();
        res.send("success");
    });
});


//add card.gongyi
router.post("/v1/cards/gongyi/:pid/", function (req, res, next) {
    resources.cards.findById(req.params.pid).exec(function (err, result) {
        if (err)  res.status(500).send(err);
        result.gongyi.push({"name": req.body.name, "price": req.body.price,"images":req.body.images,"num":req.body.num});
        result.save();
        res.send("success");
    });
});




module.exports = router;