/**
 * Created by Administrator on 2015/11/7 0007.
 */
/*订单集合*/
var order={
       openid:String,//用户openid
    no:String, //订单号
    order_type:Number,//订单类型 1 直接印刷 2。看稿印刷
    card:{c_type:String,gongyi:String},//名片信息,
    currentAdd:String,//当前位置
    images:[String],//图片
    num:Number,//数量
    totalMoney:String,//总金额
    payInfo:{payType:String,payState:Boolean},//支付信息  类型 状态  微信支付  or  货到付款
    temInfo:{id:String,type:Number,price:String},//模板信息 id 模板类型  价格
    expressInfo:{no:String,state:Number},// 快递信息  快递号、状态  0 未收货、已收货
    userInfo:{name:String,company:String,address:String,phone:String,QQ:String,note:String},//用户地址信息  姓名 公司 地址 电话 qq 备注
    note:String,//备注
    boolShared:{type:Boolean,default:false},  //状态
    createInfo:{createTime: {type: Date, default: Date.now},people:String},
    updateInfo:{createTime: {type: Date, default: Date.now},people:String},
    states:Number //状态 0 待付款 1 已支付 3 已完成  4 已下单 5已发货 6删除订单
};
module.exports=order;