/**
 * Created by Administrator on 2015/11/7 0007.
 */
/*模板 定制*/
var template={
    name:String,//名称
    no:Number,//编号
    images:[String],//模板图片
    currentAdd:String,//当前位置
    type:Number,//类型 0 模板 1定制
    card:{c_type:String,gongyi:String},//名片信息
    price:String,//价格
    createInfo:{createTime: {type: Date, default: Date.now},people:String},
    updateInfo:{createTime: {type: Date, default: Date.now},people:String},
    states:{type:Boolean,default:true}  //状态
};

module.exports=template;
