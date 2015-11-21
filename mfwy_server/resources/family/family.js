/**
 * Created by Administrator on 2015/11/7 0007.
 */
/*名片安家*/
var Resource, auth, model, resources;

Resource = require('node-odata').Resource;

model = require('../../models');

auth = require('../auth');

module.exports = Resource('families', model.families)
    .list().auth(auth.admin);