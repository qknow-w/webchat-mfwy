/**
 * Created by Administrator on 2015/10/17 0017.
 */
/*后台登陆用户信息 */
var user={
    name:String,//昵称
    account:String,//帐号
    email:String,//eamil
    password:String,//密码
    currentAdd:String,//当前位置标识，
    AddressInfo:{name:String,province:String,city:String,district:String},//用户地址信息 省 市 区
    role:String,//角色
    token:{type: String, default: " "},
    permission:[String],//权限
    router:[String],//路由
    userInfo:{IDCard:String,age:{type: Number, default: 0},sex:String},//用户信息
    createInfo:{createTime: {type: Date, default: Date.now},people:String},
    updateInfo:{createTime: {type: Date, default: Date.now},people:String},
    states:{type:Boolean,default:true}//状态

};

module.exports=user;