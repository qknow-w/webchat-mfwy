/**
 * Created by Administrator on 2015/11/7 0007.
 */
/*名片集合*/
var Resource, auth, model, resources;

Resource = require('node-odata').Resource;

model = require('../../models');

auth = require('../auth');

/*module.exports = Resource('cards', model.cards)
    .list().auth(auth.admin);*/

module.exports = Resource('cards', model.cards)
    .list().auth(auth.admin);