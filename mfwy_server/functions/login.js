/**
 * Created by Administrator on 2015/9/13 0013.
 */
/**
 * Created by Administrator on 2015/9/6 0006.
 */
var crypto = require('crypto'),
    func = require('node-odata').Function,
    resources = require('node-odata').resources,
    co = require('co');
router = func();

//注册回调
router.post('/v1/login', function (req, res, next) {
    // console.log(req.body);
    var account, pwd;
    account = req.body.account;
    pwd = req.body.password;
    console.log(account);
    co(function *() {
      var  user = yield resources.users.findOne({
            "password": pwd
        }).or([{
            "account": account
        }, {
            "email": account
        }]);
        console.log(user);
        user.token = crypto.createHash("md5").update(new Date() + pwd).digest("hex");
        user.save();
        return user;

    }).then(function(user){
        res.set("authorization", user.token);
        return  res.json({
            account: user.account,
            password: user.password,
            email: user.email,
            role:user.role,
            permission:user.permission,
            router:user.router,
            states:user.states
        });
    }).catch(function(err){
        console.log(err);
        return res.status(401).send("fail to login");
    })


});

router.post('/v1/auto-login', function (req, res, next) {
    console.log(req.user);
    if (!req.user) {
        return res.status(401).send("fail to auto-login");
    }
   return res.json({
        account: req.user.account,
        password: req.user.password,
        email: req.user.email,
        role:req.user.role,
        permission:req.user.permission,
        router:req.user.router,
        states:req.user.states
    });
});

router.post('/v1/logout', function (req, res, next) {
    var token;
    token = req.get("authorization");

    co(function *() {
        var  user = yield resources.users.findOne({
            "token": token
        });
        console.log(user);
        user.token = null;
        user.save();
        return user;

    }).then(function(user){
        return res.send("logout success");
    }).catch(function(err){
        console.log(err);
        return res.status(400).send("User not found.");
    });


});

module.exports = router;
