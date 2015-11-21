/**
 * Created by Administrator on 2015/11/7 0007.
 */
/*模板 定制*/
var Resource, auth, model, resources;

Resource = require('node-odata').Resource;

model = require('../../models');

auth = require('../auth');

module.exports = Resource('templates', model.templates)
    .list().auth(auth.admin);
