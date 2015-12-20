/**
 * Created by wy on 2015/12/15.
 */
var Resource, auth, model, resources;

Resource = require('node-odata').Resource;

model = require('../../models');

auth = require('../auth');

module.exports = Resource('setting', model.setting)
    .list().auth(auth.admin);