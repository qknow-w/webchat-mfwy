/**
 * Created by Administrator on 2015/12/11 0011.
 */
var IPLog={
    ip:String,
    createInfo:{createTime: {type: Date, default: Date.now},people:String},
    updateInfo:{createTime: {type: Date, default: Date.now},people:String},
    states:{type:Boolean,default:true}//״̬
};

module.exports=IPLog;