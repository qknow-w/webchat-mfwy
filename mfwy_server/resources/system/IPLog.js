/**
 * Created by Administrator on 2015/12/11 0011.
 */
var Resource, auth, model, resources;

Resource = require('node-odata').Resource;

model = require('../../models');

auth = require('../auth');

module.exports = Resource('logs', model.ip)
    .list().auth(auth.admin);