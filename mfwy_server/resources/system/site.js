/**
 * Created by Administrator on 2015/12/7 0007.
 */
var Resource, auth, model, resources;

Resource = require('node-odata').Resource;

model = require('../../models');

auth = require('../auth');

module.exports = Resource('sites', model.sites)
    .list().auth(auth.admin);