/**
 * Created by Administrator on 2015/12/7 0007.
 */
var site={
    name:String,//站点名称
    AddressInfo:{province:String,city:String,district:String},//用户地址信息 省 市 区
    userInfo:{IDCard:String,age:{type: Number, default: 0},sex:String},//用户信息
    createInfo:{createTime: {type: Date, default: Date.now},people:String},
    updateInfo:{createTime: {type: Date, default: Date.now},people:String},
    states:{type:Boolean,default:true}//状态

};

module.exports=site;