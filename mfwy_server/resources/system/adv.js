/**
 * Created by Administrator on 2015/12/6 0006.
 */
var Resource, auth, model, resources;

Resource = require('node-odata').Resource;

model = require('../../models');

auth = require('../auth');

module.exports = Resource('adv', model.adv)
    .list().auth(auth.admin);