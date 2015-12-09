/**
 * Created by Administrator on 2015/11/7 0007.
 */
/*人脉信息*/
var connection = {
    card_family: String,//安家图片,
    currentAdd:String,//当前位置// ，
    name: String,//名称
    company: String,//公司
    images: [String],//图片
    address: String,//地址
    qq: String,//qq
    phone: String,//电话
    wechat: String,//微信
    createInfo: {createTime: {type: Date, default: Date.now}, people: String},
    updateInfo: {createTime: {type: Date, default: Date.now}, people: String},
    states: {type: Boolean, default: true}  //状态
};

module.exports = connection;