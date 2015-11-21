/**
 * Created by Administrator on 2015/11/7 0007.
 */
/*订单集合*/
var Resource, auth, model, resources;

Resource = require('node-odata').Resource;

model = require('../../models');

auth = require('../auth');

module.exports = Resource('orders', model.orders)
    .list().auth(auth.admin);