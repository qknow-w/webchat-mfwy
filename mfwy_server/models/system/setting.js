/**
 * Created by Administrator on 2015/12/15.
 */
var setting={
    customerServicePhone:String,//客服电话
    currentAdd:String,//当前位置标识，
    createInfo:{createTime: {type: Date, default: Date.now},people:String},
    updateInfo:{createTime: {type: Date, default: Date.now},people:String},
    states:{type:Boolean,default:true}//״̬
};

module.exports=setting;