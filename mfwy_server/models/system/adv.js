/**
 * Created by Administrator on 2015/12/6 0006.
 */
/*广告管理 */
var adv={
    name:String,//昵称
    images:String,
    currentAdd:String,//当前位置标识
    createInfo:{createTime: {type: Date, default: Date.now},people:String},
    updateInfo:{createTime: {type: Date, default: Date.now},people:String},
    states:{type:Boolean,default:true}//状态

};

module.exports=adv;