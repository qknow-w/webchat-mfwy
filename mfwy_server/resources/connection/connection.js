/**
 * Created by Administrator on 2015/11/7 0007.
 */
/*人脉信息*/
var Resource, auth, model, resources;

Resource = require('node-odata').Resource;

model = require('../../models');

auth = require('../auth');

module.exports = Resource('connections', model.connections)
    .list().auth(auth.admin);