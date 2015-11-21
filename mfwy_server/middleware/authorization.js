/**
 * Created by Administrator on 2015/9/6 0006.
 */


var resources = require('node-odata').resources;

module.exports = function(req, res, next) {
    var token;
    token = req.headers.authorization;
    console.log("author",token);
    if (!token) {
        return next();
    }
    return resources.users.findOne({
        token: token
    }).exec(function(err, user) {
        console.log(user);
        if (user && user.states) {
            console.log("exit");
            req.user = user;
        }
        return next();
    });
};