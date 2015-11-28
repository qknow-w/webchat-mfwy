/**
 * Created by Administrator on 2015/11/7 0007.
 */
/*名片集合*/
var card={
    c_type:[{num:Number,name:String,price:String}],//类型
    gongyi:[{num:Number,name:String,price:String}],//工艺
    price:String, //价格
    currentAdd:String,//当前位置
    createInfo:{createTime: {type: Date, default: Date.now},people:String},
    updateInfo:{createTime: {type: Date, default: Date.now},people:String},
    states:{type:Boolean,default:true}//状态
};

module.exports=card;