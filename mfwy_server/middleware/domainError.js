/**
 * Created by Administrator on 2015/9/9 0009.
 */
var domain;

domain = require("domain");

module.exports = function() {
    return function(req, res, next) {
        var d;
        d = domain.create();
        d.add(req);
        d.add(res);
        d._throwErrorCount = 0;
        d.on("error", function(err) {
            d._throwErrorCount++;
            if (d._throwErrorCount > 1) {
                return;
            }
            res.setHeader("Connection", "close");
            return next(err);
        });
        return d.run(next);
    };
};