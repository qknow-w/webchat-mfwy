/**
 * Created by Administrator on 2015/10/17 0017.
 */
var Resource, auth, model, resources;

Resource = require('node-odata').Resource;

model = require('../../models');

auth = require('../auth');

module.exports = Resource('users', model.users)
    .list().auth(auth.admin);