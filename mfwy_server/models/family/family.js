/**
 * Created by Administrator on 2015/11/7 0007.
 */
/*名片安家*/
var family={
    openid:String,//用户信息
    images:[String],//图片
    createInfo:{createTime: {type: Date, default: Date.now},people:String},
    updateInfo:{createTime: {type: Date, default: Date.now},people:String},
    states:{type:Boolean,default:false}  //状态 true 已设计
};

module.exports=family;