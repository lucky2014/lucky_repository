import api from '../api'
const handleAsync = (state,msg,callback)=>{
    if(msg.resultCode==1000){
        callback&&callback();
    }else if (msg.resultCode==4102) {
        if (msg.returnObject.isTips=="n") {
            state.dialog.errorTip.tip = "您上次参与活动获得【"+msg.returnObject.prizeName+"】，但已过领取时限，现已失效！";
            state.dialog.errorTip.show = true;
        }
    }else if(msg.resultCode==4007){
        state.dialog.errorTip.tip = "活动已经结束";
        state.dialog.errorTip.show = true;
    }else if (msg.resultCode==4100) {
        state.dialog.errorTip.tip = "您已经没有抽奖次数了";
        state.dialog.errorTip.show = true;
    }else if (msg.resultCode==4014) {
        state.dialog.errorTip.tip = "您已经助力过了";
        state.dialog.errorTip.show = true;
    }else if (msg.resultCode==4015) {
        state.dialog.errorTip.tip = "您已经回答过了";
        state.dialog.errorTip.show = true;
    }else if (msg.resultCode==4016) {/* 回答慢了一步，已经有好友助力成功 */
        state.distribuated.askHelpResult = true;
    }else if (msg.resultCode==4017) {/*4017弹框不给关。特殊处理 */
        state.dialog.errorTip_4017.tip = msg.returnObject;
        state.dialog.errorTip_4017.show = true;
    }else if (msg.resultCode==4018) {/*4018弹框不给关。特殊处理 */
        state.dialog.errorTip_4017.tip = "自己无法助力，请让好友帮忙吧";
        state.dialog.errorTip_4017.show = true;
    }else if(msg.resultCode==9999||msg.resultCode==9998){
        state.dialog.errorTip.tip = "网络好像有点问题，请稍后再试~";
        state.dialog.errorTip.show = true;
    }else{
        state.dialog.errorTip.tip = msg.returnObject;
        state.dialog.errorTip.show = true;
    }
}
export default {
    FETCH_LOADING({state},bool){
        state.progress = bool;
    },
    lottery({commit,state,dispatch},params){
        api.lottery(params).then((msg)=>{
            //msg = {"resultCode":1000,"returnObject":{"prizeMethod":1,"recordId":183887,"markedWord":"","prizeLevel":"asafa","prizeName":"100M全国流量包","prizeType":1}};
            handleAsync(state,msg,()=>{
                commit('lottery',msg);
            })
            // commit('lottery',msg);
        })
    },
    getTimes({commit,state},params){
        api.getTimes(params).then((msg)=>{
            handleAsync(state,msg,()=>{
                commit('getTimes',msg);
            })
        })
    },
    getActivityInfo({commit,state},params){
        api.getActivityInfo(params).then((msg)=>{
            handleAsync(state,msg,()=>{
                commit('getActivityInfo',msg);
            })
        })
    },
    formDialog({commit,state}){
        api.addUserInfo({...state.dialogForm.values,...state.activity}).then((msg)=>{
            commit('addUserInfo',msg);
        })
    },
    getBestPrize({commit,state},params){
        api.getBestPrize(params).then((msg)=>{
            handleAsync(state,msg,()=>{
                commit('getBestPrize',msg);
            })
        })
    },
    getDistribuated({commit,state},params){
        api.getDistribuated(params).then((msg)=>{
            handleAsync(state,msg,()=>{
                commit('getDistribuated',msg);
            })
        })
    },
    getDistribuatedShare({commit,state},params){
        api.getDistribuatedShare(params).then((msg)=>{
            handleAsync(state,msg,()=>{
                commit('getDistribuated',msg);
            })
        })
    },
    submitAnswer({commit,state},params){
        api.submitAnswer(params).then((msg)=>{
            console.log(msg)
            handleAsync(state,msg,()=>{
                commit('submitAnswer',msg);
            })
        })
    },
    lotteryRecordLite({commit,state},params){
        api.lotteryRecordLite(params).then((msg)=>{
            handleAsync(state,msg,()=>{
                commit('lotteryRecordLite',msg);
            })
        })
    },
    getActivityUserInfo({commit,state},params){
        api.getActivityUserInfo(params).then((msg)=>{
            handleAsync(state,msg,()=>{
                commit('getActivityUserInfo',msg);
            })
        })
    },
}